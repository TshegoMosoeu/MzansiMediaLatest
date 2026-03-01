// components/PricingBlock.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CTAButton from './CTAButton.jsx';
import { useCompanyInfo } from './CompanyInfoProvider.jsx';

export default function PricingBlock({ showAddonsTab = true }) {
  const { pricing = {} } = useCompanyInfo() || {};
  const {
    tabs = [],
    design = [],
    hostingTiers = [],
    leads = [],
    social = [],
    addOns = [],
  } = pricing;

  // Build tabs in preferred order.
  const tabsFinal = useMemo(() => {
    const src = Array.isArray(tabs) && tabs.length
      ? [...tabs]
      : [{ id: 'design', label: 'Website Design' }];
    const filtered = showAddonsTab
      ? src
      : src.filter(t => t.id !== 'addons' && t.id !== 'addOns');

    const hasHostingTab = filtered.some(t => t.id === 'hosting' || t.id === 'hostingTiers');
    const hasAddonsTab  = filtered.some(t => t.id === 'addons'  || t.id === 'addOns');

    let withHosting = filtered;
    if ((hostingTiers || []).length && !hasHostingTab) {
      const designIdx = filtered.findIndex(t => t.id === 'design');
      const hostingTab = { id: 'hosting', label: 'Web Hosting' };
      withHosting =
        designIdx >= 0
          ? [...filtered.slice(0, designIdx + 1), hostingTab, ...filtered.slice(designIdx + 1)]
          : [...filtered, hostingTab];
    }

    let withAddons = withHosting;
    if (showAddonsTab && (addOns || []).length && !hasAddonsTab) {
      const addonsTab = { id: 'addons', label: 'Add-ons' };
      const afterHostingIdx = withHosting.findIndex(t => t.id === 'hosting' || t.id === 'hostingTiers');
      if (afterHostingIdx >= 0) {
        withAddons = [
          ...withHosting.slice(0, afterHostingIdx + 1),
          addonsTab,
          ...withHosting.slice(afterHostingIdx + 1),
        ];
      } else {
        const designIdx2 = withHosting.findIndex(t => t.id === 'design');
        withAddons =
          designIdx2 >= 0
            ? [...withHosting.slice(0, designIdx2 + 1), addonsTab, ...withHosting.slice(designIdx2 + 1)]
            : [...withHosting, addonsTab];
      }
    }

    return withAddons;
  }, [tabs, hostingTiers, addOns, showAddonsTab]);

  // Active tab state (default to first tab or 'design')
  const [activeTab, setActiveTab] = useState(tabsFinal[0]?.id || 'design');

  useEffect(() => {
    if (!tabsFinal.some(t => t.id === activeTab)) {
      setActiveTab(tabsFinal[0]?.id || 'design');
    }
  }, [tabsFinal, activeTab]);

  // Billing term for hosting
  const [billingTerm] = useState('annual'); // 'annual'
  const isHostingTab = activeTab === 'hosting' || activeTab === 'hostingTiers';

  // Resolve plans for the current tab
  const plans = useMemo(() => {
    if (isHostingTab) return hostingTiers || [];
    const map = {
      design,
      leads,
      social,
      hostingTiers,
      addons: addOns,
      addOns,
    };
    return map[activeTab] || [];
  }, [activeTab, isHostingTab, design, leads, social, hostingTiers, addOns]);

  // --- Mobile carousel helpers (scroll hints + arrows) ---
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Compute an effective max that ignores the extra right padding "peek"
  const getScrollMetrics = () => {
    const el = scrollerRef.current;
    if (!el) return { maxScrollContent: 0, padLeft: 0, padRight: 0, gap: 0, step: 0 };

    const cs = getComputedStyle(el);
    const padLeft = parseFloat(cs.paddingLeft || '0') || 0;
    const padRight = parseFloat(cs.paddingRight || '0') || 0;
    const gap = parseFloat(cs.gap || '0') || 0;

    // Card width (fallback to ~80% container if not found)
    const card = el.querySelector('.pricing-plan-card');
    const step = (card?.clientWidth || el.clientWidth * 0.8) + gap;

    // Do not let the arrows drive into the right padding "void"
    const maxScrollContent = Math.max(0, el.scrollWidth - padRight - el.clientWidth);

    return { maxScrollContent, padLeft, padRight, gap, step };
  };

  const updateScrollHints = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { maxScrollContent } = getScrollMetrics();

    const epsilon = 2; // soften float rounding
    const atStart = el.scrollLeft <= epsilon;
    const atEnd = el.scrollLeft >= maxScrollContent - epsilon;

    // If there's nothing to scroll (content fits)
    const nothingToScroll = maxScrollContent <= epsilon;

    setCanScrollLeft(!nothingToScroll && !atStart);
    setCanScrollRight(!nothingToScroll && !atEnd);
  };

  useEffect(() => {
    // Reset position on tab/billing change + re-evaluate
    const el = scrollerRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: 'auto' });
      // Let layout settle
      requestAnimationFrame(updateScrollHints);
    }
  }, [plans, activeTab, billingTerm]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollHints();
    const onScroll = () => updateScrollHints();
    const onResize = () => updateScrollHints();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const { maxScrollContent, step } = getScrollMetrics();
    const delta = step || (el.clientWidth * 0.8);

    let next = dir === 'left' ? el.scrollLeft - delta : el.scrollLeft + delta;

    // Snap-ish math for better stops (browser snap will also help)
    if (step) {
      next = Math.round(next / step) * step;
    }

    // Clamp so we never show the padding-only "void"
    next = Math.max(0, Math.min(next, maxScrollContent));

    el.scrollTo({ left: next, behavior: 'smooth' });
  };

  return (
    <section className="section section--light section--pricing">
      <div className="section-heading section-heading--center">
        <span className="section-heading__eyebrow">Pricing</span>
        <h2 className="section-heading__title">Simple, transparent plans</h2>
        <p className="section-heading__description">
          Pick a starting point. We’ll tailor any package to your goals and budget.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="pricing-tabs" role="tablist" aria-label="Pricing categories">
        {tabsFinal.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`pricing-tab${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="pricing-tab__label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Hosting billing switcher removed (locked to annual) */}

      {/* Plans (wrapped for mobile carousel arrows/fades) */}
      <div className={`carousel ${canScrollLeft ? 'has-left' : ''} ${canScrollRight ? 'has-right' : ''}`}>
        <div
          className="pricing-plan-grid"
          ref={scrollerRef}
          role="region"
          aria-label="Plan options"
        >
          {plans.map((plan, i) => {
            // HOSTING plans
            if (isHostingTab && plan.pricing) {
              const term = plan.pricing[billingTerm] || {};
              const perMonth = term?.perMonth ?? '—';
              const total = term?.total;
              const discountLabel = term?.discountLabel;

              return (
                <article
                  key={(plan.id || plan.name || 'hosting') + i}
                  className={`pricing-plan-card${plan.popular ? ' is-popular' : ''}`}
                >
                  {plan.popular && (
                    <div className="plan-badge" aria-hidden="true">
                      <span className="icon-star">★</span> Most popular
                    </div>
                  )}

                  <header className="plan-header">
                    <h3 className="plan-title">{plan.name}</h3>

                    {/* ALWAYS render subtitle row (even if empty) */}
                    <p className="plan-description">{plan.subtitle ?? ""}</p>

                    <div className="plan-price">
                      <span className="plan-price-number">From R{perMonth}</span>
                      <span className="plan-price-suffix">/mo</span>
                    </div>

                    {/* ALWAYS render meta wrapper (even if empty) */}
                    <div className="plan-meta-group">
                      {billingTerm !== 'monthly' && (
                        <>
                          {typeof total !== 'undefined' && (
                            <div className="plan-meta">Billed as R{total} upfront</div>
                          )}
                          {discountLabel && <div className="plan-meta">{discountLabel}</div>}
                        </>
                      )}
                      {plan.specs?.ssl && <div className="plan-meta">{plan.specs.ssl}</div>}
                      {plan.support && <div className="plan-meta">{plan.support}</div>}
                    </div>
                  </header>

                  <ul className="plan-features">
                    {(plan.features || []).map((f, idx) => (
                      <li key={idx}>
                        <span className="icon-check" aria-hidden="true">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <CTAButton to="/contact" variant="primary-fill" className="plan-btn">
                    Get started
                  </CTAButton> */}
                </article>
              );
            }

            // DEFAULT (design / leads / social / add-ons)
            return (
              <article
                key={(plan.id || plan.name || 'plan') + i}
                className={`pricing-plan-card${plan.popular ? ' is-popular' : ''}`}
              >
                {plan.popular && (
                  <div className="plan-badge" aria-hidden="true">
                    <span className="icon-star">★</span> Most popular
                  </div>
                )}

                <header className="plan-header">
                  <h3 className="plan-title">{plan.name}</h3>

                  {/* ALWAYS render description row */}
                  <p className="plan-description">{plan.description ?? ""}</p>

                  <div className="plan-price">
                    <span className="plan-price-number">R{plan.price ?? "—"}</span>
                    {plan.priceSuffix && <span className="plan-price-suffix">{plan.priceSuffix}</span>}
                  </div>

                  {/* ALWAYS render meta wrapper */}
                  <div className="plan-meta-group">
                    {plan.oneTime && <div className="plan-meta">one-time</div>}
                  </div>
                </header>

                <ul className="plan-features">
                  {(plan.features || []).map((f, idx) => (
                    <li key={idx}>
                      <span className="icon-check" aria-hidden="true">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* <CTAButton to="/contact" variant="primary-fill" className="plan-btn">
                  Get started
                </CTAButton> */}
              </article>
            );
          })}
        </div>
        <CTAButton to="/contact" variant="primary-fill" className="plan-btn">
                  Get started
                </CTAButton>

        {/* Arrows (shown on mobile via CSS, only when can scroll) */}
        {/* <button
          className="carousel-arrow is-left"
          onClick={() => scrollByCard('left')}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          ‹
        </button>
        <button
          className="carousel-arrow is-right"
          onClick={() => scrollByCard('right')}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          ›
        </button> */}
      </div>

      {/* Global note for hosting (pulled from first plan if present) */}
      {isHostingTab && hostingTiers?.length > 0 && hostingTiers[0]?.pricing?.note && (
        <p className="muted" style={{ marginTop: 12, fontSize: 14 }}>
          {hostingTiers[0].pricing.note}
        </p>
      )}
    </section>
  );
}

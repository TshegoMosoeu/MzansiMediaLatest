import { createContext, useContext, useMemo } from "react";
import {companyDetails} from '../config/companyDetails.js'

const CompanyInfoContext = createContext(companyDetails)
// companyDetails is the default value if no Provider wraps the component tree

//CompanyInfoProvider
//  It receives props:
//  children: anything you wrap inside this provider.
//  value: optional overrides you want to merge into companyDetails
//create contextValue, but memoizes it. It will only recompute when value changes as per dependency array

export function CompanyInfoProvider({children,value}) {
    const contextValue=useMemo(()=>{
        if (!value) return companyDetails;

        return {
            ...companyDetails,
            ...value,
            contact: { ...companyDetails.contact, ...value.contact},
            social: { ...companyDetails.social, ...value.social},
        }
    },[value])

    return <CompanyInfoContext.Provider value={contextValue}>{children}</CompanyInfoContext.Provider>
}

// Exports a custom hook.
// Instead of writing useContext(CompanyInfoContext) everywhere, you just call useCompanyInfo().
export function useCompanyInfo() {
    return useContext(CompanyInfoContext)
}

function resolvePath(source,path) {
    if (!path) return undefined;
    return path.split('.').reduce((acc,key)=>(acc && acc[key] !== undefined ? acc[key] : undefined), source)
}

export function CompanyInfoField({path, as: Component='span', className= '', prefix='', suffix=''}){
    const info=useCompanyInfo();
    const value = resolvePath(info, path)

    if (value == undefined || value === null || value==='') {
        return null
    }

    return <Component className={className}>{`${prefix}${value}${suffix}`}</Component>
}
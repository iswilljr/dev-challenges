export interface InfoJobsOffersResponse {
  currentPage?: number
  pageSize?: number
  totalResults?: number
  currentResults?: number
  totalPages?: number
  availableSortingMethods?: string[]
  sortBy?: string
  sinceDate?: string
  items?: Item[]
  dataLayer?: DataLayer
  queryParameters?: QueryParameters
  eligibleForAutomaticAlertCreation?: boolean
  offers?: Item[]
}

export interface DataLayer {
  offer_search_page?: string
  offer_search_page_limit?: string
  search_category?: string
  region_level2_id?: string
}

export interface Item {
  id?: string
  title?: string
  province?: Category
  city?: string
  link?: string
  category?: Category
  contractType?: Category
  subcategory?: Category
  salaryMin?: Category
  salaryMax?: Category
  salaryPeriod?: Category
  experienceMin?: Category
  workDay?: Category
  study?: Category
  teleworking?: Category
  published?: string
  updated?: string
  author?: Author
  requirementMin?: string
  bold?: boolean
  applications?: string
  subSegment?: number
  executive?: boolean
  salaryDescription?: string
  multiProvince?: boolean
  urgent?: boolean
  color?: boolean
}

export interface Author {
  id?: string
  privateId?: number
  name?: string
  uri?: string
  logoUrl?: string
  corporateResponsive?: boolean
  showCorporativeHeader?: boolean
}

export interface Category {
  id?: number
  value?: string
}

export interface QueryParameters {
  study?: any[]
  province?: string[]
  salaryPeriod?: string
  city?: any[]
  contractType?: any[]
  query?: string
  experienceMin?: any[]
  category?: string[]
  workDay?: any[]
  teleworking?: any[]
}

export interface Offer {
  title?: string
  id?: string
  state?: number
  creationDate?: string
  updateDate?: string
  city?: string
  externalUrlForm?: string
  blocked?: boolean
  applications?: number
  province?: Category
  experienceMin?: Category
  category?: Category
  subcategory?: Category
  studiesMin?: Category
  residence?: Category
  country?: Category
  contractType?: Category
  journey?: Category
  subSegment?: number
  profile?: Profile
  cityPD?: number
  zipCode?: string
  latitude?: number
  longitude?: number
  exactLocation?: boolean
  department?: string
  vacancies?: number
  minRequirements?: string
  description?: string
  desiredRequirements?: string
  commissions?: string
  contractDuration?: string
  referenceId?: string
  detailedStudiesId?: number
  studying?: boolean
  showPay?: boolean
  multiProvince?: boolean
  maxPay?: Pay
  minPay?: Pay
  schedule?: string
  jobLevel?: Category
  staffInCharge?: Category
  hasKillerQuestions?: number
  hasOpenQuestions?: number
  fiscalAddress?: string
  shouldAskExportConsent?: boolean
  exportConsentName?: string
  link?: string
  active?: boolean
  archived?: boolean
  deleted?: boolean
  availableForVisualization?: boolean
  skillsList?: SkillsList[]
  salaryDescription?: string
}

export interface Pay {
  amount?: number
  amountId?: number
  periodId?: number
  periodValue?: string
  amountValue?: string
}

export interface Profile {
  id?: string
  name?: string
  description?: string
  province?: Category
  web?: string
  numberWorkers?: number
  logoUrl?: string
  url?: string
  corporateWebsiteUrl?: string
  websiteUrl?: string
  hidden?: boolean
  typeIndustry?: Category
  country?: Category
  corporateResponsive?: boolean
  showCorporativeHeader?: boolean
  clientId?: number
}

export interface SkillsList {
  skill?: string
}

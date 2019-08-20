import { REQUEST_TYPES, REQUEST_STATUS, REQUEST_PRICES, GOVERNATES, CITIES, OCCUPATION_TYPES, ZONES, CUSTOMS, DISABILITIES_TYPES, EQUIPMENTS_TYPES, USERS, COUNCILS, CITIZENS, COMMITTEE_MEMBERS, COMMITTEES, EYE_MEASURES, EYE_REVEAL_SETTINGS, REQUESTS, PAYMENTS, REVIEW_REQUESTS, SYSTEM_ADMINISTRATION, CONTINUE_REGISTERING, BONES_REVEAL, EYE_REVEAL, APPROVE_REQUESTS, AUDITS, DOCUMENT_TYPES, EYE_REVEAL_REGISTRATION, BONES_REVEAL_REGISTRATION, RESULTS, SYSTEM_TABLES_MAINTENANCE } from './app-words';

interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}
export const CITIZENS_NAV_ITEM: NavData =
{
  name: `${CITIZENS}`,
  url: '/citizen/search',
  icon: 'cui-people',
}

export const REQUESTS_NAV_ITEM: NavData =
{
  name: `${REQUESTS}`,
  url: '/request/search',
  icon: 'cui-envelope-letter'
}

export const PAYMENTS_NAV_ITEM: NavData =
{
  name: `${PAYMENTS}`,
  url: '/request/payments',
  icon: 'cui-dollar',
}

export const CONTINUE_REGISTERING_NAV_ITEM: NavData =
{
  name: `${CONTINUE_REGISTERING}`,
  url: '/request/continue-registering',
  icon: 'cui-dollar',
}

export const BONES_REVEAL_NAV_ITEM: NavData =
{
  name: `${BONES_REVEAL}`,
  url: '/request/bones-reveal',
  icon: 'cui-dollar',
}

export const EYE_REVEAL_NAV_ITEM: NavData =
{
  name: `${EYE_REVEAL}`,
  url: '/request/eye-reveal',
  icon: 'cui-dollar',
}

export const EYE_REVEAL_REGISTRATION_NAV_ITEM: NavData =
{
  name: `${EYE_REVEAL_REGISTRATION}`,
  url: '/request/eye-reveal-registering',
  icon: 'cui-dollar',
}

export const BONES_REVEAL_REGISTRATION_NAV_ITEM: NavData =
{
  name: `${BONES_REVEAL_REGISTRATION}`,
  url: '/request/bones-reveal-registering',
  icon: 'cui-dollar',
}

export const REVIEW_REQUESTS_NAV_ITEM: NavData =
{
  name: `${REVIEW_REQUESTS}`,
  url: '/request/review-requests',
  icon: 'icon-layers',
}

export const APPROVE_REQUESTS_NAV_ITEM: NavData =
{
  name: `${APPROVE_REQUESTS}`,
  url: '/request/approve-requests',
  icon: 'icon-layers',
}

export const RESULTS_NAV_ITEM: NavData =
{
  name: `${RESULTS}`,
  url: '/request/results',
  icon: 'icon-pie-chart'
}

export const COMMITTEE_MEMBERS_NAV_ITEM: NavData =
{
  name: `${COMMITTEE_MEMBERS}`,
  url: '/administration/committee-members',
  icon: 'icon-star'
}

export const COMMITTEES_NAV_ITEM: NavData =
{
  name: `${COMMITTEES}`,
  url: '/administration/committees',
  icon: 'icon-star'
}

export const REQUEST_TYPES_NAV_ITEM: NavData =
{
  name: `${REQUEST_TYPES}`,
  url: '/administration/types',
  icon: 'icon-star'
}

export const REQUEST_STATUS_NAV_ITEM: NavData =
{
  name: `${REQUEST_STATUS}`,
  url: '/administration/request-status',
  icon: 'icon-star'
}

export const EYE_REVEAL_SETTINGS_NAV_ITEM: NavData =
{
  name: `${EYE_REVEAL_SETTINGS}`,
  url: '/administration/eye-reveal-settings',
  icon: 'icon-star'
}

export const EYE_MEASURES_NAV_ITEM: NavData =
{
  name: `${EYE_MEASURES}`,
  url: '/administration/eye-measures',
  icon: 'icon-star'
}

export const GOVERNATES_NAV_ITEM: NavData =
{
  name: `${GOVERNATES}`,
  url: '/administration/governates',
  icon: 'icon-star'
}

export const CITIES_NAV_ITEM: NavData =
{
  name: `${CITIES}`,
  url: '/administration/cities',
  icon: 'icon-star'
}

export const OCCUPATION_TYPES_NAV_ITEM: NavData =
{
  name: `${OCCUPATION_TYPES}`,
  url: '/administration/occupations',
  icon: 'icon-star'
}

export const ZONES_NAV_ITEM: NavData =
{
  name: `${ZONES}`,
  url: '/administration/zones',
  icon: 'icon-star'
}

export const CUSTOMS_NAV_ITEM: NavData =
{
  name: `${CUSTOMS}`,
  url: '/administration/customs',
  icon: 'icon-star'
}

export const DISABILITIES_TYPES_NAV_ITEM: NavData =
{
  name: `${DISABILITIES_TYPES}`,
  url: '/administration/disabilities',
  icon: 'icon-star'
}

export const EQUIPMENTS_TYPES_NAV_ITEM: NavData =
{
  name: `${EQUIPMENTS_TYPES}`,
  url: '/administration/equipments',
  icon: 'icon-star'
}

export const USERS_NAV_ITEM: NavData =
{
  name: `${USERS}`,
  url: '/administration/users',
  icon: 'icon-star'
}

export const DOCUMENT_TYPES_NAV_ITEM: NavData =
{
  name: `${DOCUMENT_TYPES}`,
  url: '/administration/document-types',
  icon: 'icon-star'
}

export const AUDITS_NAV_ITEM: NavData =
{
  name: `${AUDITS}`,
  url: '/administration/audits',
  icon: 'icon-star'
}

export const SYSTEM_ADMINISTRATION_NAV_ITEMS: NavData =
{
  name: `${SYSTEM_ADMINISTRATION}`,
  url: '/administration',
  icon: 'cui-briefcase',
  children: [
    {
      name: `${REQUEST_TYPES}`,
      url: '/administration/types',
      icon: 'icon-star'
    },
    {
      name: `${REQUEST_STATUS}`,
      url: '/administration/request-status',
      icon: 'icon-star'
    },
    {
      name: `${EYE_REVEAL_SETTINGS}`,
      url: '/administration/eye-reveal-settings',
      icon: 'icon-star'
    },
    {
      name: `${EYE_MEASURES}`,
      url: '/administration/eye-measures',
      icon: 'icon-star'
    },
    {
      name: `${GOVERNATES}`,
      url: '/administration/governates',
      icon: 'icon-star'
    },
    {
      name: `${CITIES}`,
      url: '/administration/cities',
      icon: 'icon-star'
    },
    {
      name: `${OCCUPATION_TYPES}`,
      url: '/administration/occupations',
      icon: 'icon-star'
    },
    {
      name: `${ZONES}`,
      url: '/administration/zones',
      icon: 'icon-star'
    },
    {
      name: `${CUSTOMS}`,
      url: '/administration/customs',
      icon: 'icon-star'
    },
    {
      name: `${DISABILITIES_TYPES}`,
      url: '/administration/disabilities',
      icon: 'icon-star'
    },
    {
      name: `${EQUIPMENTS_TYPES}`,
      url: '/administration/equipments',
      icon: 'icon-star'
    },
    {
      name: `${DOCUMENT_TYPES}`,
      url: '/administration/document-types',
      icon: 'icon-star'
    },
    {
      name: `${USERS}`,
      url: '/administration/users',
      icon: 'icon-star'
    },
    {
      name: `${AUDITS}`,
      url: '/administration/audits',
      icon: 'icon-star'
    }
  ]
}
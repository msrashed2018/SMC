--------------------------------------------------------
--  DDL for Index CITIZEN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CITIZEN_PK" ON "MOH_WORKFLOW_SCHEMA"."CITIZEN" ("CITIZEN_ID");
--------------------------------------------------------
--  DDL for Index CITIZEN_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CITIZEN_UK1" ON "MOH_WORKFLOW_SCHEMA"."CITIZEN" ("NATIONAL_ID");
--------------------------------------------------------
--  DDL for Index CITY_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CITY_PK" ON "MOH_WORKFLOW_SCHEMA"."CITY" ("CITY_ID");
--------------------------------------------------------
--  DDL for Index CITY_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CITY_UK1" ON "MOH_WORKFLOW_SCHEMA"."CITY" ("CITY_NAME");
--------------------------------------------------------
--  DDL for Index COMMITTEE_MEMBER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."COMMITTEE_MEMBER_PK" ON "MOH_WORKFLOW_SCHEMA"."COMMITTEE_MEMBER" ("COMMITTEE_MEMBER_ID");
--------------------------------------------------------
--  DDL for Index COMMITTEE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."COMMITTEE_PK" ON "MOH_WORKFLOW_SCHEMA"."COMMITTEE" ("COMMITTEE_ID");
--------------------------------------------------------
--  DDL for Index CUSTOM_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CUSTOM_PK" ON "MOH_WORKFLOW_SCHEMA"."CUSTOM" ("CUSTOM_ID");
--------------------------------------------------------
--  DDL for Index CUSTOM_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."CUSTOM_UK1" ON "MOH_WORKFLOW_SCHEMA"."CUSTOM" ("CUSTOM_NAME");
--------------------------------------------------------
--  DDL for Index DISABILITY_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."DISABILITY_PK" ON "MOH_WORKFLOW_SCHEMA"."DISABILITY" ("DISABILITY_ID");
--------------------------------------------------------
--  DDL for Index DISABILITY_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."DISABILITY_UK1" ON "MOH_WORKFLOW_SCHEMA"."DISABILITY" ("DISABILITY_NAME");
--------------------------------------------------------
--  DDL for Index DOCUMENT_TYPE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."DOCUMENT_TYPE_PK" ON "MOH_WORKFLOW_SCHEMA"."DOCUMENT_TYPE" ("DOCUMENT_TYPE_ID");
--------------------------------------------------------
--  DDL for Index DOCUMENT_TYPE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."DOCUMENT_TYPE_UK1" ON "MOH_WORKFLOW_SCHEMA"."DOCUMENT_TYPE" ("DOCUMENT_TYPE_NAME");
--------------------------------------------------------
--  DDL for Index EQUIPMENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EQUIPMENT_PK" ON "MOH_WORKFLOW_SCHEMA"."EQUIPMENT" ("EQUIPMENT_ID");
--------------------------------------------------------
--  DDL for Index EQUIPMENT_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EQUIPMENT_UK1" ON "MOH_WORKFLOW_SCHEMA"."EQUIPMENT" ("EQUIPMENT_NAME");
--------------------------------------------------------
--  DDL for Index EYE_MEASURE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EYE_MEASURE_PK" ON "MOH_WORKFLOW_SCHEMA"."EYE_MEASURE" ("MEASURE_ID");
--------------------------------------------------------
--  DDL for Index EYE_MEASURE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EYE_MEASURE_UK1" ON "MOH_WORKFLOW_SCHEMA"."EYE_MEASURE" ("MEASURE_TITLE");
--------------------------------------------------------
--  DDL for Index EYE_REVEAL_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL_PK" ON "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL" ("EYE_REVEAL_ID");
--------------------------------------------------------
--  DDL for Index EYE_REVEAL_SETTING_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL_SETTING_PK" ON "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL_SETTING" ("SETTING_ID");
--------------------------------------------------------
--  DDL for Index GOVERNATE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."GOVERNATE_PK" ON "MOH_WORKFLOW_SCHEMA"."GOVERNATE" ("GOVERNATE_ID");
--------------------------------------------------------
--  DDL for Index GOVERNATE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."GOVERNATE_UK1" ON "MOH_WORKFLOW_SCHEMA"."GOVERNATE" ("GOVERNATE_NAME");
--------------------------------------------------------
--  DDL for Index GOVERNATE_UK2
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."GOVERNATE_UK2" ON "MOH_WORKFLOW_SCHEMA"."GOVERNATE" ("GOVERNATE_CODE");
--------------------------------------------------------
--  DDL for Index OCCUPATION_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."OCCUPATION_PK" ON "MOH_WORKFLOW_SCHEMA"."OCCUPATION" ("OCCUPATION_ID");
--------------------------------------------------------
--  DDL for Index OCCUPATION_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."OCCUPATION_UK1" ON "MOH_WORKFLOW_SCHEMA"."OCCUPATION" ("OCCUPATION_NAME");
--------------------------------------------------------
--  DDL for Index REQUEST_DOCUMENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_DOCUMENT_PK" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_DOCUMENT" ("REQUEST_DOCUMENT_ID");
--------------------------------------------------------
--  DDL for Index REQUEST_PAYMENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_PAYMENT_PK" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_PAYMENT" ("REQUEST_PAYMENT_ID");
--------------------------------------------------------
--  DDL for Index REQUEST_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_PK" ON "MOH_WORKFLOW_SCHEMA"."REQUEST" ("REQUEST_ID");
--------------------------------------------------------
--  DDL for Index REQUEST_STATUS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_STATUS_PK" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_STATUS" ("REQUEST_STATUS_ID");
--------------------------------------------------------
--  DDL for Index REQUEST_STATUS_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_STATUS_UK1" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_STATUS" ("REQUEST_STATUS_NAME");
--------------------------------------------------------
--  DDL for Index REQUEST_TYPE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_TYPE_PK" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_TYPE" ("REQUEST_TYPE_ID");
--------------------------------------------------------
--  DDL for Index REQUEST_TYPE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."REQUEST_TYPE_UK1" ON "MOH_WORKFLOW_SCHEMA"."REQUEST_TYPE" ("REQUEST_TYPE_NAME");
--------------------------------------------------------
--  DDL for Index SYSTEM_AUDIT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."SYSTEM_AUDIT_PK" ON "MOH_WORKFLOW_SCHEMA"."SYSTEM_AUDIT" ("AUDIT_ID");
--------------------------------------------------------
--  DDL for Index SYSTEM_ROLE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."SYSTEM_ROLE_PK" ON "MOH_WORKFLOW_SCHEMA"."SYSTEM_ROLE" ("ROLE_ID");
--------------------------------------------------------
--  DDL for Index SYSTEM_ROLE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."SYSTEM_ROLE_UK1" ON "MOH_WORKFLOW_SCHEMA"."SYSTEM_ROLE" ("ROLE_NAME");
--------------------------------------------------------
--  DDL for Index SYSTEM_USER_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."SYSTEM_USER_PK" ON "MOH_WORKFLOW_SCHEMA"."SYSTEM_USER" ("USER_ID");
--------------------------------------------------------
--  DDL for Index SYSTEM_USER_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."SYSTEM_USER_UK1" ON "MOH_WORKFLOW_SCHEMA"."SYSTEM_USER" ("USERNAME");
--------------------------------------------------------
--  DDL for Index TRAFFIC_MANAGEMENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."TRAFFIC_MANAGEMENT_PK" ON "MOH_WORKFLOW_SCHEMA"."TRAFFIC_MANAGEMENT" ("TRAFFIC_ID");
--------------------------------------------------------
--  DDL for Index TRAFFIC_MANAGEMENT_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."TRAFFIC_MANAGEMENT_UK1" ON "MOH_WORKFLOW_SCHEMA"."TRAFFIC_MANAGEMENT" ("TRAFFIC_NAME");
--------------------------------------------------------
--  DDL for Index ZONE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."ZONE_PK" ON "MOH_WORKFLOW_SCHEMA"."ZONE" ("ZONE_ID");
--------------------------------------------------------
--  DDL for Index ZONE_UK1
--------------------------------------------------------

  CREATE UNIQUE INDEX "MOH_WORKFLOW_SCHEMA"."ZONE_UK1" ON "MOH_WORKFLOW_SCHEMA"."ZONE" ("ZONE_NAME");

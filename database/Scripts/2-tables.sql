--------------------------------------------------------
--  DDL for Table CITIZEN
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."CITIZEN" 
   (	"CITIZEN_ID" NUMBER, 
	"CITIZEN_NAME" VARCHAR2(100 BYTE), 
	"NATIONAL_ID" NUMBER, 
	"GENDER" VARCHAR2(10 BYTE), 
	"BIRTH_DATE" TIMESTAMP (6), 
	"ADDRESS" VARCHAR2(200 BYTE), 
	"MOBILE_NO" VARCHAR2(100 BYTE), 
	"FINGERPRINT" VARCHAR2(200 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"CREATED_DATE" TIMESTAMP (6), 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DATE" TIMESTAMP (6), 
	"CITY_ID" NUMBER, 
	"GOVERNATE_ID" NUMBER, 
	"OCCUPATION_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table CITY
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."CITY" 
   (	"CITY_ID" NUMBER, 
	"CITY_NAME" VARCHAR2(100 BYTE), 
	"GOVERNATE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table COMMITTEE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."COMMITTEE" 
   (	"COMMITTEE_ID" NUMBER, 
	"COMMITTEE_DATE" TIMESTAMP (6), 
	"COMMITTEE_FUNCTION" VARCHAR2(100 BYTE), 
	"COMMITTEE_TYPE" VARCHAR2(100 BYTE), 
	"MEMBER_ONE_ID" NUMBER, 
	"MEMBER_TWO_ID" NUMBER, 
	"MEMBER_THREE_ID" NUMBER, 
	"MEMBER_FOUR_ID" NUMBER, 
	"MEMBER_FIVE_ID" NUMBER, 
	"MEMBER_SIX_ID" NUMBER, 
	"COMMITTEE_DESCRIPTION" VARCHAR2(255 BYTE), 
	"ZONE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table COMMITTEE_MEMBER
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."COMMITTEE_MEMBER" 
   (	"COMMITTEE_MEMBER_ID" NUMBER, 
	"MEMBER_NAME" VARCHAR2(100 BYTE), 
	"MEMBER_TITLE" VARCHAR2(100 BYTE), 
	"MEMBER_DESCRIPTION" VARCHAR2(255 BYTE), 
	"MEMBER_MOBILE_NO" VARCHAR2(20 BYTE), 
	"ZONE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table CUSTOM
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."CUSTOM" 
   (	"CUSTOM_ID" NUMBER , 
	"CUSTOM_NAME" VARCHAR2(100 BYTE), 
	"CUSTOM_DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table DISABILITY
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."DISABILITY" 
   (	"DISABILITY_ID" NUMBER , 
	"DISABILITY_NAME" VARCHAR2(355 BYTE), 
	"EQUIPMENT_ID" NUMBER, 
	"ACCEPTED" NUMBER(1,0), 
	"DISABILITY_DESCRIPTION" VARCHAR2(355 BYTE)
   );
--------------------------------------------------------
--  DDL for Table DOCUMENT_TYPE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."DOCUMENT_TYPE" 
   (	"DOCUMENT_TYPE_ID" NUMBER, 
	"DOCUMENT_TYPE_NAME" VARCHAR2(100 BYTE), 
	"DOCUMENT_TYPE_DESCRIPTION" VARCHAR2(100 BYTE)
   );
--------------------------------------------------------
--  DDL for Table EQUIPMENT
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."EQUIPMENT" 
   (	"EQUIPMENT_ID" NUMBER, 
	"EQUIPMENT_NAME" VARCHAR2(355 BYTE), 
	"EQUIPMENT_DESCRIPTION" VARCHAR2(355 BYTE)
   );
--------------------------------------------------------
--  DDL for Table EYE_MEASURE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."EYE_MEASURE" 
   (	"MEASURE_ID" NUMBER, 
	"MEASURE_TITLE" VARCHAR2(100 BYTE), 
	"MEASURE_DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table EYE_REVEAL
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL" 
   (	"EYE_REVEAL_ID" NUMBER, 
	"DISTINGUISH_COLOR" NUMBER(1,0), 
	"FIELD_OF_SIGHT" NUMBER, 
	"RESULT" VARCHAR2(100 BYTE), 
	"REVEAL_DONE" NUMBER, 
	"SQUINT" NUMBER, 
	"USE_GLASSES" NUMBER, 
	"LEFT_MEASURE_ID" NUMBER, 
	"RIGHT_MEASURE_ID" NUMBER, 
	"DESCRIPTION" VARCHAR2(255 BYTE), 
	"REQUEST_ID" NUMBER
   );

--------------------------------------------------------
--  DDL for Table EYE_REVEAL_SETTING
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."EYE_REVEAL_SETTING" 
   (	"SETTING_ID" VARCHAR2(20 BYTE), 
	"SETTING_DESCRIPTION" VARCHAR2(100 BYTE), 
	"DISTINGUISH_COLOR" VARCHAR2(1 BYTE), 
	"SETTING_RESULT" VARCHAR2(50 BYTE), 
	"SQUINT" NUMBER(1,0), 
	"USE_GLASSES" NUMBER(1,0), 
	"LEFT_MEASURE_ID" NUMBER, 
	"RIGHT_MEASURE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table GOVERNATE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."GOVERNATE" 
   (	"GOVERNATE_ID" NUMBER, 
	"GOVERNATE_CODE" NUMBER, 
	"GOVERNATE_NAME" VARCHAR2(100 BYTE), 
	"ZONE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table OCCUPATION
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."OCCUPATION" 
   (	"OCCUPATION_ID" NUMBER, 
	"OCCUPATION_NAME" VARCHAR2(100 BYTE), 
	"OCCUPATION_DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table REQUEST
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."REQUEST" 
   (	"REQUEST_ID" NUMBER, 
	"CITIZEN_ID" NUMBER, 
	"REQUEST_TYPE_ID" NUMBER, 
	"CUSTOM_ID" NUMBER, 
	"TRAFFIC_MANAGEMENT_ID" NUMBER, 
	"REQUEST_DATE" TIMESTAMP (6), 
	"STATE" VARCHAR2(100 BYTE), 
	"EYE_REVEAL_STATE" VARCHAR2(100 BYTE), 
	"BONES_REVEAL_STATE" VARCHAR2(100 BYTE), 
	"CREATED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_BY" VARCHAR2(100 BYTE), 
	"MODIFIED_DATE" TIMESTAMP (6), 
	"BONES_COMMITTEE_ID" NUMBER, 
	"EYE_COMMITTEE_ID" NUMBER, 
	"REQUEST_STATUS_ID" NUMBER, 
	"DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table REQUEST_DOCUMENT
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."REQUEST_DOCUMENT" 
   (	"REQUEST_DOCUMENT_ID" NUMBER, 
	"NAME" VARCHAR2(100 BYTE), 
	"PATH" VARCHAR2(200 BYTE), 
	"TYPE" VARCHAR2(100 BYTE), 
	"REQUEST_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table REQUEST_PAYMENT
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."REQUEST_PAYMENT" 
   (	"REQUEST_PAYMENT_ID" NUMBER, 
	"PAYMENT_DATE" TIMESTAMP (6), 
	"PAYMENT_DONE" NUMBER(1,0), 
	"PRICE" NUMBER, 
	"RECEIPT_SERIAL_NO" VARCHAR2(255 BYTE), 
	"REQUEST_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table REQUEST_STATUS
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."REQUEST_STATUS" 
   (	"REQUEST_STATUS_ID" NUMBER, 
	"REQUEST_STATUS_NAME" VARCHAR2(255 BYTE), 
	"REQUEST_STATUS_DESCRIPTION" VARCHAR2(300 BYTE)
   );
--------------------------------------------------------
--  DDL for Table REQUEST_TYPE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."REQUEST_TYPE" 
   (	"REQUEST_TYPE_ID" NUMBER, 
	"REQUEST_TYPE_NAME" VARCHAR2(255 BYTE), 
	"REQUEST_TYPE_PRICE" NUMBER DEFAULT 0, 
	"REQUEST_TYPE_DESCRIPTION" VARCHAR2(355 BYTE)
   );
--------------------------------------------------------
--  DDL for Table SYSTEM_AUDIT
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."SYSTEM_AUDIT" 
   (	"AUDIT_ID" NUMBER, 
	"ACTION" VARCHAR2(255 BYTE), 
	"DETAILS" VARCHAR2(300 BYTE), 
	"REQUEST_ID" VARCHAR2(100 BYTE), 
	"PERFORMED_BY" VARCHAR2(100 BYTE), 
	"TIMESTAMP" TIMESTAMP (6), 
	"COLUMN1" VARCHAR2(20 BYTE)
   );
--------------------------------------------------------
--  DDL for Table SYSTEM_ROLE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."SYSTEM_ROLE" 
   (	"ROLE_ID" NUMBER, 
	"ROLE_NAME" VARCHAR2(150 BYTE), 
	"ROLE_DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table SYSTEM_USER
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."SYSTEM_USER" 
   (	"USER_ID" NUMBER, 
	"USERNAME" VARCHAR2(100 BYTE), 
	"PASSWORD" VARCHAR2(255 BYTE), 
	"CREATED_DATE" TIMESTAMP (6), 
	"ZONE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table TRAFFIC_MANAGEMENT
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."TRAFFIC_MANAGEMENT" 
   (	"TRAFFIC_ID" NUMBER, 
	"TRAFFIC_NAME" VARCHAR2(200 BYTE), 
	"TRAFFIC_DESCRIPTION" VARCHAR2(255 BYTE)
   );
--------------------------------------------------------
--  DDL for Table USER_ROLES
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."USER_ROLES" 
   (	
	"USER_ID" NUMBER, 
	"ROLE_ID" NUMBER
   );
--------------------------------------------------------
--  DDL for Table ZONE
--------------------------------------------------------

  CREATE TABLE "MOH_WORKFLOW_SCHEMA"."ZONE" 
   (	"ZONE_ID" NUMBER, 
	"ZONE_NAME" VARCHAR2(100 BYTE), 
	"ZONE_DESCRIPTION" VARCHAR2(255 BYTE)
   );

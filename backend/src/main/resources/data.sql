---- ZONE Data
Insert into ZONE (ZONE_NAME) values('المجلس الطبي الرئيسي بالقاهرة');
Insert into ZONE (ZONE_NAME) values('المجلس الطبي العام بسوهاج');
Insert into ZONE (ZONE_NAME) values('مجلس طبي قنا');
Insert into ZONE (ZONE_NAME) values('مجلس طبي بورسعيد');
Insert into ZONE (ZONE_NAME) values('مجلس طبي السويس');
Insert into ZONE (ZONE_NAME) values('مجلس طبي دمياط');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الدقهلية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الشرقية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي القليوبية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي كفر الشيخ');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الغربية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي البحيرة');
Insert into ZONE (ZONE_NAME) values('مجلس طبي المنوفية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الاسماعيلية');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الجيزة');
Insert into ZONE (ZONE_NAME) values('مجلس طبي بني سويف');
Insert into ZONE (ZONE_NAME) values('مجلس طبي المنيا');
Insert into ZONE (ZONE_NAME) values('مجلس طبي أسيوط');
Insert into ZONE (ZONE_NAME) values('مجلس طبي البحر الأحمر');
Insert into ZONE (ZONE_NAME) values('مجلس طبي أسوان');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الأقصر');
Insert into ZONE (ZONE_NAME) values('مجلس طبي الوادي الجديد');
Insert into ZONE (ZONE_NAME) values('مجلس طبي شمال سيناء');
Insert into ZONE (ZONE_NAME) values('مجلس طبي جنوب سيناء');

-- USER DATA
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (1,'admin','$2a$10$L9MIF6lIh1bVDi7xnz4g1uZ9Ylcl73e89adMYQ6tmf/G28YnIUueq',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (2,'eye','$2a$10$tMPI04TYrepQCB9cmmunHOPpEboWzD6lvwJxiOsq0g.EGoCDnfbpG',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (3,'bones','$2a$10$dtmakn6rmEr7k0ctRIHCgu3j9AAcnhRcItEE88R7OQ0SjX02rYQvm',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (4,'register','$2a$10$CaLwfM/7DHErFQ354btuUuSk19NWgQHeszPpGb/1GHx0Huj3lNpv2',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (5,'medicalregister','$2a$10$e9IdbUSfoNJN9OUu7r9JKeG/9IcGpVAYkYOSdRAAsH7km2SMr7TeW',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (6,'reviewer','$2a$10$UF0W1BtHUi7xBG863OYGW.GrRMdgrmS/NdHUVr5tA5U8OA7SuOM1m',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (7,'approver','$2a$10$oFruULr1K2h8ZxQ49q3FE.xTRXSXJPdlrhB8MdWERfzIOpAzDNJy.',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (8,'citizenregister','$2a$10$twUR7P8alu1qkOVIeWd1G.R5U6bUe7rH6I1SdlzrsADDTT9YRD/W2',1);
insert into SYSTEM_USER (USER_ID,USERNAME,PASSWORD,ZONE_ID) values (9,'cashier','$2a$10$a7fwnuxNM2yqHBkFm.kqJunvBnCpL.s/xqQbOSOr0RlKlSaxWyduG',1);

insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(1,'ADMIN','تعديل النظام بالكامل');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(2,'CITIZEN','اضافة و تعديل بيانات المواطنين');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(3,'CASHIER','تسجيل المدفوعات لطلبات الكشف المستعجل و الكشف المستعجل');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(4,'CONTINUE_REGISTERING','استكمال بيانات الطلب, رفع اوراق المواطن و تحديد لجان كشف العظام و الرمد');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(5,'EYE','تسجيل حضور المواطنين لكشف الرمد');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(6,'BONES','تسجيل حضور المواطنين لكشف العظام');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(7,'MEDICAL_REGISTERING','تسجيل بيانات كشف العظام و الرمد , و رفع اوارق الكشف');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(8,'REQUESTS_REVIEWER','مراجعة الطلبات و امكانية تعديل نتيجة الطلب');
insert into SYSTEM_ROLE (ROLE_ID, ROLE_NAME, ROLE_DESCRIPTION) values(9,'REQUESTS_APPROVER','اعتماد الطلبات و امكانية تعديل النتيجة');

insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(1,1);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(2,5);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(3,6);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(4,4);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(5,7);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(6,8);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(7,9);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(8,2);
insert into USER_ROLES (USER_ID, ROLE_ID) VALUES(9,3);



-- EQUIPMENT Data
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة البنزين والفرامل تدار باليد وفاصل حركة اوتوماتيك','دواسة البنزين والفركة اوتوماتيك');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة البنزين والفرامل يدار باليد','دواسة البنزين والفرامل يدار باليد');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة فاصل الحركة يدار باليد','دواسة فاصل الحركة يدار باليد');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة فاصل الحركة هيدروماتيك','دواسة فاصل الحركة هيدروماتيك');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('م ناقل سرعة اوتوماتيك','مفاتيح التشغيل والاناره بالجهة اليم');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهة اليسري بالإضافة إلي عجله ','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهة اليمني بالإضافة إلي عجله قيادة مائية مزوده ببكره ك','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهه اليمني بالإضافة إلي عجلة قياده مائيه والبناتيك ','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('قيادة يدوية كاملة  دواسة البنزين والفرامل وفاصل الحركة يدار باليد ','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهه اليسري بالإضافة إلي عجلة قياده صل حركه هيدروماتيك ','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهة اليمني بالإضافة إلي عجله قيادة مائية + ناقل سرعة اوتوماتيك','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('البنزين والفرامل يدار باليد وعجلة قياده مائيه وفاصل حركه هيدروماتيك','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة البنزين والفرامل تدار باليد وفاصل الحركة يدار باليد أو اوتوماتيك','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('دواسة فاصل الحركة تدار باليد أو اوتوماتيك','');
Insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_DESCRIPTION) values ('مفاتيح التشغيل والاناره بالجهه اليسري بالإضافة إلدروماتيك, ','');

--
---- GENDER Data
--Insert into GENDER (GENDER_NAME) values ('ذكر');
--Insert into GENDER (GENDER_NAME) values ('انثي');

--
--
----OCCUPATION DATA
Insert into OCCUPATION (OCCUPATION_NAME) values ('مهندس مدني');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مهندس إتصالات');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مدرس');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مهندس زراعي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('موظف');
Insert into OCCUPATION (OCCUPATION_NAME) values ('عامل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('بالمعاش');
Insert into OCCUPATION (OCCUPATION_NAME) values ('ميكانيكي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على معهد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مهندس');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي ثانويه عامه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مدير إدارة');
Insert into OCCUPATION (OCCUPATION_NAME) values ('سائق');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مؤذن مسجد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محامي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مدير عام');
Insert into OCCUPATION (OCCUPATION_NAME) values ('معاون');
Insert into OCCUPATION (OCCUPATION_NAME) values ('اخصائي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين شرطه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('طباخ');
Insert into OCCUPATION (OCCUPATION_NAME) values ('إمام وخطيب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مدير مدرسة');
Insert into OCCUPATION (OCCUPATION_NAME) values ('باحث مالي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('باحث قانوني');
Insert into OCCUPATION (OCCUPATION_NAME) values ('سكرتير');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مأمور ضبط قضائي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مأمور ضرائب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محفظ قرآن كريم');
Insert into OCCUPATION (OCCUPATION_NAME) values ('فني تحاليل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('موجه عام');
Insert into OCCUPATION (OCCUPATION_NAME) values ('نائب مدير');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي دبلوم معلمين');
Insert into OCCUPATION (OCCUPATION_NAME) values ('إداري');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين توريدات');
Insert into OCCUPATION (OCCUPATION_NAME) values ('كاهن');
Insert into OCCUPATION (OCCUPATION_NAME) values ('دبلوم تدريب مهني');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محلل نظم');
Insert into OCCUPATION (OCCUPATION_NAME) values ('وكيل مدرسه / معهد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('دبلوم تمريض');
Insert into OCCUPATION (OCCUPATION_NAME) values ('شرطي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('طالب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('طبيب بشري');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على ليسانس');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محاسب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('كاتب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صيدلي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على دبلوم فنادق');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي دكتوراه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('فرد امن');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محصل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('رسام');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مأمور شهر عقاري');
Insert into OCCUPATION (OCCUPATION_NAME) values ('شيخ بلد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مأمور جمرك');
Insert into OCCUPATION (OCCUPATION_NAME) values ('استاذ مساعد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('بدون عمل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('ربة منزل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مشرف');
Insert into OCCUPATION (OCCUPATION_NAME) values ('فني');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي بكالوريوس');
Insert into OCCUPATION (OCCUPATION_NAME) values ('نجار');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على دبلوم زراعه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على دبلوم تجارة');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على دبلوم صنايع');
Insert into OCCUPATION (OCCUPATION_NAME) values ('نقاش');
Insert into OCCUPATION (OCCUPATION_NAME) values ('كهربائى');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مكوجي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('سباك');
Insert into OCCUPATION (OCCUPATION_NAME) values ('رئيس قسم');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صاحب شركه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صاحب محل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('جزار');
Insert into OCCUPATION (OCCUPATION_NAME) values ('ضابط شرطه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('ضابط جيش');
Insert into OCCUPATION (OCCUPATION_NAME) values ('أعمال حره');
Insert into OCCUPATION (OCCUPATION_NAME) values ('ممرض');
Insert into OCCUPATION (OCCUPATION_NAME) values ('محرر إعلامي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صحفي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('قارئ ومحصل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مراجع هندسي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مراجع حسابات');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين مرافق زراعية');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين معمل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين مخزن');
Insert into OCCUPATION (OCCUPATION_NAME) values ('دكتور');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صاحب مكتب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('شيخ معهد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي ماجستير');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مندوب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('طبيب بيطري');
Insert into OCCUPATION (OCCUPATION_NAME) values ('اخصائي تحاليل');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مستشار');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مراقب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مفتش');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مصرفي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('معيد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('فني طباعه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('امين مكتبه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('باحث');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل علي دبلوم اداره وخدمات');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صاحب ورشه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مراجع');
Insert into OCCUPATION (OCCUPATION_NAME) values ('وكيل وزارة');
Insert into OCCUPATION (OCCUPATION_NAME) values ('عامل مسجد');
Insert into OCCUPATION (OCCUPATION_NAME) values ('حاصل على ثانويه ازهريه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('مساعد بالقوات المسلحه');
Insert into OCCUPATION (OCCUPATION_NAME) values ('صاحب كافيتريا');
Insert into OCCUPATION (OCCUPATION_NAME) values ('عامل زراعي');
Insert into OCCUPATION (OCCUPATION_NAME) values ('عميد كلية');
Insert into OCCUPATION (OCCUPATION_NAME) values ('عضو مجلس النواب');
Insert into OCCUPATION (OCCUPATION_NAME) values ('كيميائي');



---- GOVERNATE DATA
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 1,'القاهره');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1,2,'الاسكندريه');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1,29,'الاقصر');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 19,'الاسماعيلية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 18,'البحيرة');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 21,'الجيزة');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 12,'الدقهلية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 13,'الشرقية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values (1, 16,'الغربية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 14,'القليوبية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 17,'المنوفية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 24,'المنيا');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 28,'أسوان');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 25,'أسيوط');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 22,'بني سويف');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 26,'سوهاج');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 27,'قنا');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 15,'كفر الشيخ');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 33,'مرسي مطروح');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 88,'مولود خارج الجمهورية');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 3,'بورسعيد');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 4,'السويس ');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 11,'دمياط');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 23,'الفيوم ');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 31,'البحر الأحمر');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 32,'الوادى الجديد');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 34,'شمال سيناء');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 35,'جنوب سيناء');
Insert into GOVERNATE (ZONE_ID, GOVERNATE_CODE, GOVERNATE_NAME) values ( 1, 37,'اخرى');


---- City DATA
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(6,'الشيخ زايد');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(1,'المعادي');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(2,'مدينة س');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(3,'مدينة 3');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(4,'مدينة 4');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(5,'مدينة 5');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(7,'مدينة 6');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(8,'مدينة 7');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(9,'مدينة 8');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(10,'مدينة 9');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(11,'مدينة 10');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(12,'مدينة 11');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(13,'مدينة 12');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(14,'مدينة 13');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(15,'مدينة 14');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(16,'مدينة 15');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(17,'مدينة 16');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(18,'مدينة 17');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(19,'مدينة 18');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(20,'مدينة 19');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(21,'مدينة 20');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(22,'مدينة 21');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(23,'مدينة 22');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(24,'مدينة 23');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(25,'مدينة 24');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(26,'مدينة 25');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(27,'مدينة 26');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(28,'مدينة 27');
Insert into CITY (GOVERNATE_ID,CITY_NAME) values(29,'مدينة 28');



---- EYE MEASURE DATE
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/6','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/12','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/18','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/24','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/36','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('6/60','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE, MEASURE_DESCRIPTION) values ('5/60','لاتوجد ملاحظات');
insert into EYE_MEASURE (MEASURE_TITLE) values ('أقل من 6/60');
insert into EYE_MEASURE (MEASURE_TITLE) values ('لاتبصر الضوء');
insert into EYE_MEASURE (MEASURE_TITLE) values ('تبصر الضوء');
insert into EYE_MEASURE (MEASURE_TITLE) values ('تبصر حركة يد');
insert into EYE_MEASURE (MEASURE_TITLE) values ('عد أصابع');
insert into EYE_MEASURE (MEASURE_TITLE) values ('خيال');
insert into EYE_MEASURE (MEASURE_TITLE) values ('عين زجاجيه');
insert into EYE_MEASURE (MEASURE_TITLE) values ('عدسات لاصقه');


-- REQUEST_TYPE DATA
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تظلم عيون');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تظلم عظام وعيون');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'مد صلاحيه');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(200, 'كشف عادي');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'إعادة مناظرة تظلم عظام');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(400, 'كشف مستعجل');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'إعادة مناظره عظام');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تجديد نتيجة كشف طبي');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تصويب تجهيزه');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'صحة تشخيص');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'صحة تشخيص وتجهيزه');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'إعادة مناظرة عيون');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'إعادة مناظرة  تظلم عيون');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تظلم استثنائي عظام');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'تظلم استثنائي عيون');
insert into REQUEST_TYPE (REQUEST_TYPE_PRICE, REQUEST_TYPE_NAME) values(0, 'إعادة مناظرة تجديد');


-- REQUEST_STATUS DATA

insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قرار ملغي');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قرار ملغي للتعديل');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('خطاب اداري-مراجعه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('يعاد مناظرته-مراجعه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('تم التسجيل');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('توصيه نهائيه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قرار نهائي');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('خطاب اداري');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('يعاد مناظرته');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('رفض');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('مد صلاحيه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('خطاب اداري- تعديل');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('يعاد مناظرته-تعديل');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('توصيه مبدئيه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('تعديل توصيه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قرار ملغي لانتهاء المده');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('لم يحضر');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('حفظ القرار لانتهاء المده');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('إعادة مناظرة تجديد - مراجعه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('إعادة مناظرة تجديد');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قبول التجديد - مراجعه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('قبول التجديد');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('رفض التجديد - مراجعه');
insert into REQUEST_STATUS (REQUEST_STATUS_NAME) values('رفض التجديد');


-- DISABILITY DATA
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 1,'بتر بالطرفين السفليين');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 2,'تيبس كامل بمفصل الركبة اليمني يبعد الطرفين السفليين عن الدوسات');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 3,'تيبس كامل بمفصل الركبة اليسري يبعد الطرفين السفليين عن الدوسات');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 4,'شلل بالطرف السفلي الأيمن مؤثر علي القوة العضلية وحركة المفاصل ');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 5,'شلل بالطرف السفلي الأيسر مؤثر علي القوة العضلية وحركة المفاصل');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 6,'بتر بالطرف السفلي الأيمن مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 7,'بتر بالطرف السفلي الأيسر مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('1', 8,'ضعف بعضلات الطرف السفلي الأيمن مؤثر علي القوة العضلية وحركة المفاصل');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 9,'ضعف بعضلات الطرف السفلي الأيسر مؤثر علي القوة العضلية وحركة المفاصل');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 10,'تيبس بالكاحل الأيمن مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 11,'تيبس بالكاحل الأيسر مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 12,'سقوط بالقدم اليمني مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 13,'سقوط بالقدم اليسري مؤثر');
insert into DISABILITY(ACCEPTED, EQUIPMENT_ID, DISABILITY_NAME) values('0', 14,'بتر بالطرف العلوي الأيمن ويرتدي طرف صناعي وظيفي يعمل');






insert into CITIZEN ( ADDRESS, BIRTH_DATE, CREATED_BY, CREATED_DATE, MOBILE_NO, MODIFIED_BY, MODIFIED_DATE, CITIZEN_NAME, NATIONAL_ID, CITY_ID, GENDER, GOVERNATE_ID, OCCUPATION_ID)
values('october', '1989-06-20 03:00:00', 'admin', '2019-06-20', '01015090111', null, null,  'محمدي صلاح راشد', '29106202101140', 2, 'ذكر', 1, 3 );

insert into CITIZEN ( ADDRESS, BIRTH_DATE, CREATED_BY, CREATED_DATE, MOBILE_NO, MODIFIED_BY, MODIFIED_DATE, CITIZEN_NAME, NATIONAL_ID, CITY_ID, GENDER, GOVERNATE_ID, OCCUPATION_ID)
values('october', '1989-06-20 03:00:00', 'admin', '2019-06-22', '01015090111', null, null,  'احمد صلاح راشد', '29106202101141', 2, 'ذكر', 1, 3 );

insert into CITIZEN ( ADDRESS, BIRTH_DATE, CREATED_BY, CREATED_DATE, MOBILE_NO, MODIFIED_BY, MODIFIED_DATE, CITIZEN_NAME, NATIONAL_ID, CITY_ID, GENDER, GOVERNATE_ID, OCCUPATION_ID)
values('october', '1989-06-20 03:00:00', 'admin', '2019-06-24', '01015090111', null, null,  'حسن صلاح راشد', '29106202101142', 2, 'ذكر', 1, 3 );

insert into CITIZEN ( ADDRESS, BIRTH_DATE, CREATED_BY, CREATED_DATE, MOBILE_NO, MODIFIED_BY, MODIFIED_DATE, CITIZEN_NAME, NATIONAL_ID, CITY_ID, GENDER, GOVERNATE_ID, OCCUPATION_ID)
values('october', '1989-06-20 03:00:00', 'admin', '2019-06-26', '01015090111', null, null,  'سعيد صلاح راشد', '29106202101143', 2, 'ذكر', 1, 3 );


--insert into request ( CREATED_BY  , DESCRIPTION  , MODIFIED_BY  , MODIFIED_DATE  , REQUEST_DATE  , STATE  , CITIZEN_ID  , CUSTOM_ID  , REQUEST_STATUS_ID  , REQUEST_TYPE_ID  , TRAFFIC_MANAGEMENT_ID )
--values ('admin', null, null, null, now(), 'NEW', 1, null, null, 4, null);



-- COMMITTEE_MEMBER DATA

insert into COMMITTEE_MEMBER (ZONE_ID, MEMBER_MOBILE_NO, MEMBER_NAME, MEMBER_TITLE)  values (1, '010150905555', 'محمد صلاح','طبيب رمد');
insert into COMMITTEE_MEMBER (ZONE_ID, MEMBER_MOBILE_NO, MEMBER_NAME, MEMBER_TITLE)  values (1, '010150905555', 'احمد صلاح','طبيب عظام');
insert into COMMITTEE_MEMBER (ZONE_ID, MEMBER_MOBILE_NO, MEMBER_NAME, MEMBER_TITLE)  values (1, '010150905555', 'سيد صلاح','مقرر');
insert into COMMITTEE_MEMBER (ZONE_ID, MEMBER_MOBILE_NO, MEMBER_NAME, MEMBER_TITLE)  values (1, '010150905555', 'مي صلاح','مهندس');
insert into COMMITTEE_MEMBER (ZONE_ID, MEMBER_MOBILE_NO, MEMBER_NAME, MEMBER_TITLE)  values (1, '010150905555', 'ابراهيم صلاح','عضو');
 


-- COMMITTEE DATA
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-20 02:00:00',1,2,3,4,5, null,1,'عظام','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-21 02:00:00',1,2,3,4,5, null,1,'عظام','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-08-11 02:00:00',1,2,3,4,5, null,1,'عظام','تظلمات' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-23 02:00:00',1,2,3,4,5, null,1,'عظام','تظلمات' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-09-30 02:00:00',1,2,3,4,5, null,1,'عظام','اخري' );

insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-20 02:00:00',1,5,null,null,null, null,1,'رمد','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-24 02:00:00',1,5,null,null,null, null,1,'رمد','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-08-20 02:00:00',1,5,null,null,null, null,1,'رمد','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-08-10 02:00:00',1,5,null,null,null, null,1,'رمد','اخري' );
insert into COMMITTEE (COMMITTEE_DATE, MEMBER_ONE_ID, MEMBER_TWO_ID, MEMBER_THREE_ID, MEMBER_FOUR_ID, MEMBER_FIVE_ID, MEMBER_SIX_ID, ZONE_ID,  COMMITTEE_TYPE, COMMITTEE_FUNCTION) values ('2019-06-30 02:00:00',1,5,null,null,null, null,1,'رمد','اخري' );




-- CUSTOM DATA
insert into CUSTOM (CUSTOM_NAME) values('بورسعيد');
insert into CUSTOM (CUSTOM_NAME) values('الاسكندرية');
insert into CUSTOM (CUSTOM_NAME) values('دمياط');
insert into CUSTOM (CUSTOM_NAME) values('شبين الكوم');
insert into CUSTOM (CUSTOM_NAME) values('السويس');
insert into CUSTOM (CUSTOM_NAME) values('مدينة نصر');


-- TRAFFIC_MANAGEMENT DATA
insert into TRAFFIC_MANAGEMENT (TRAFFIC_NAME) values('إدارة مرور الجيزة');
insert into TRAFFIC_MANAGEMENT (TRAFFIC_NAME) values('إدارة مرور القاهرة');
insert into TRAFFIC_MANAGEMENT (TRAFFIC_NAME) values('إدارة مرور الاسكندرية');












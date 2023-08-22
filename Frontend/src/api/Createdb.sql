-- Add Company name in localStorage at login from backend   ----------------------




CREATE TABLE tbl_location_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                location_id nvarchar(100) NULL,
                company_name nvarchar(200) NULL,
                location_code nvarchar(200) NULL ,
                location_name nvarchar (70) NULL,
                location_address_line1 nvarchar(200) NULL,
                location_address_line2 nvarchar(200) NULL,
                location_country_id nvarchar(100) NULL,
                location_country nvarchar(100) NULL,
                location_state_id nvarchar(100) NULL,
                location_state nvarchar(100) NULL,
                location_city nvarchar(200) NULL,
                location_pin_code bigint  NULL ,
                location_gst nvarchar (70) NULL,
                contact_person nvarchar (70) NULL,
                contact_person_email nvarchar(100) NULL,
                contact_person_number bigint  NULL,
                location_latitude nvarchar(100)  NULL ,
                location_longitude nvarchar (70) NULL,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                location_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_employee_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                employee_id nvarchar(100) NULL,
                employee_name nvarchar(200) NULL,
                location nvarchar(200) NULL ,
                employee_email nvarchar (70) NULL,
                employee_number nvarchar(20) NULL,
                company nvarchar(100) NULL,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                user_id nvarchar(100) NULL,
                status nvarchar(30) NULL,
                emp_uuid nvarchar(350) NULL
)

-- Insert into tbl_employee_master( Run After Created tables whoses Resister) as a Admin


CREATE TABLE tbl_asset_type_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                asset_type_id nvarchar(100) NULL,
                asset_type nvarchar(200) NULL,
                asset_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                asset_type_uuid nvarchar(350) NULL
)

CREATE TABLE  tbl_asset_status_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                asset_status_id nvarchar(100) NULL,
                asset_status nvarchar(200) NULL,
                asset_status_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                asset_status_uuid nvarchar(350) NULL
)
CREATE TABLE tbl_manufacturer_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                manufacturer_id nvarchar(100) NULL,
                manufacturer_name nvarchar(200) NULL,
                manufacturer_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                manufacturer_uuid nvarchar(350) NULL
)


CREATE TABLE tbl_software_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                software_id nvarchar(100) NULL,
                software_name nvarchar(200) NULL,
                software_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                software_master_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_issue_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                issue_id nvarchar(100) NULL,
                issue_type nvarchar(200) NULL,
                issue_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                issue_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_purchase_type_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                purchase_id nvarchar(100) NULL,
                purchase_type nvarchar(200) NULL,
                purchase_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                purchase_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_contract_type_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                contract_id nvarchar(100) NULL,
                contract_type nvarchar(200) NULL,
                contract_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                contract_uuid nvarchar(350) NULL
)
CREATE TABLE tbl_priority_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                priority_id nvarchar(100) NULL,
                priority_type nvarchar(200) NULL,
                priority_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                priority_uuid nvarchar(350) NULL
)


CREATE TABLE tbl_ticket_status_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                ticket_id nvarchar(100) NULL,
                ticket_status nvarchar(200) NULL,
                ticket_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                ticket_uuid nvarchar(350) NULL
)


CREATE TABLE tbl_billing_freq_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                billing_freq_id nvarchar(100) NULL,
                billing_freq nvarchar(200) NULL,
               billing_freq_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                billing_freq_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_vendor_category_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                vendor_category_id nvarchar(100) NULL,
                vendor_category nvarchar(200) NULL,
                vendor_category_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                vendor_category_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_vendor_sub_category_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                vendor_sub_category_id nvarchar(100) NULL,
                vendor_category nvarchar(200) NULL,
                vendor_sub_category nvarchar(100) NULL,
                vendor_sub_category_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                vendor_sub_category_uuid nvarchar(350) NULL
)
CREATE TABLE tbl_service_action_type_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                service_action_id nvarchar(100) NULL,
                service_action_type nvarchar(200) NULL,
                service_action_type_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                service_action_type_uuid nvarchar(350) NULL
)



CREATE TABLE tbl_service_group_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                service_group_id nvarchar(100) NULL,
                service_group_type nvarchar(200) NULL,
                service_group_description nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                service_group_uuid nvarchar(350) NULL
)

CREATE TABLE  IPERISCOPE.dbo.tbl_vendor_code_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                vendor_code_id nvarchar(100) NULL,
                vendor_code nvarchar(200) NULL,
                vendor_name nvarchar(300) NULL ,
                company_email nvarchar(100) NULL ,
                company_website nvarchar(100) NULL ,
                company_gst nvarchar(100) NULL ,
                company_phone nvarchar(100) NULL ,
                company_country nvarchar(100) NULL ,
                company_country_id nvarchar(100) NULL ,
                company_state_id nvarchar(100) NULL,
                company_city nvarchar(100) NULL ,
                company_pin_code nvarchar(30) NULL ,
                company_address_line1 nvarchar(300) NULL ,
                company_address_line2 nvarchar(300) NULL ,
                venodr_portal nvarchar(20) NULL , 
                contact_person_name nvarchar(100) NULL , 
                contact_person_phone nvarchar(100) NULL, 
                contact_person_email nvarchar(100) NULL, 
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                vendor_code_uuid nvarchar(350) NULL
)

CREATE TABLE tbl_vendor_contract_master (
                sno bigint IDENTITY(1,1) NOT NULL,
                vendor_contract_id nvarchar(100) NULL,
                vendor nvarchar(150) NULL,
                company_address_line1 nvarchar(300) NULL ,
                company_address_line2 nvarchar(300) NULL ,
                company_city nvarchar(100) NULL ,
                company_state nvarchar(50) NULL,
                company_pin_code bigint NULL ,
                company_gst nvarchar(30) NULL ,
                company_website nvarchar(100) NULL ,
                company_email nvarchar(100) NULL ,
                type_of_contract nvarchar(100) NULL ,
                
                major_category nvarchar(100) NULL ,
                sub_category nvarchar(100) NULL,
                location nvarchar(150) NULL ,
                company nvarchar(100) NULL ,
                customer_account_no nvarchar(100) NULL ,
                reference_no nvarchar(100) NULL ,
                contatct_plain_details nvarchar(100) NULL ,
                
                 rate_per_month nvarchar(50) NULL,
                contract_start_date nvarchar(20) NULL ,
                invoice_generation_date nvarchar(30) NULL ,
                billling_freq nvarchar(100) NULL ,
                payee_name nvarchar(100) NULL ,
                tds nvarchar(100) NULL ,
                
                link_id_no nvarchar(50) NULL ,
                help_desk_no nvarchar(50) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                vendor_contract_uuid nvarchar(350) NULL
)

-- CREATE TABLE tbl_drizzle_agent_master (
--                 sno bigint IDENTITY(1,1) NOT NULL,
--                 employee_name nvarchar(100) NULL,
--                 mark_as_agent nvarchar(150) NULL,
--                 allocate_company nvarchar(300) NULL ,
--                 agent_email_id nvarchar(300) NULL ,
--                 agent_contact_number nvarchar(300) NULL ,
--                 allocate_location nvarchar(300) NULL ,
--                 agent_role nvarchar(300) NULL ,
--                 reporting_to nvarchar(300) NULL ,
             
                
--                 add_user_name nvarchar(50) NULL,
--                 add_system_name nvarchar(100) NULL,
--                 add_ip_address nvarchar(30) NULL,
--                 add_date_time datetime NULL,
--                 update_user_name nvarchar(30) NULL,
--                 update_system_name nvarchar(100) NULL,
--                 update_ip_address nvarchar(30) NULL,
--                 update_date_time datetime NULL,
--                 status nvarchar(30) NULL,
--                 drizzle_agent_uuid nvarchar(350) NULL
-- )




CREATE TABLE IPERISCOPE.dbo.tbl_vendor_invoice (
                sno bigint IDENTITY(1,1) NOT NULL,
                vendor nvarchar(100) NULL,
                account_no nvarchar(100) NULL,
                invoice_no nvarchar(100) NULL ,
                invoice_amt nvarchar(100) NULL ,
                invoice_date date NULL ,
                invoice_duedate date NULL ,
                invoice_subdate date NULL ,
                remark nvarchar(300) NULL ,
                reference_no  nvarchar(50) NULL ,
                printer_counter nvarchar(50) NULL ,
                invoice_status nvarchar(50) NULL ,
                   payment_detail nvarchar(50) NULL ,
                 payment_amt nvarchar(50) NULL ,
                 payment_date date NULL ,
                 payment_remark nvarchar(250) NULL ,

                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                vend_inv_uuid nvarchar(350) NULL
)


CREATE TABLE IPERISCOPE.dbo.tbl_new_assets (
                sno bigint IDENTITY(1,1) NOT NULL,
                new_asset_type_id nvarchar(20) NULL,
                asset_type nvarchar(100) NULL,
                asset_tag nvarchar(50) NULL,
                serial_no nvarchar(50) NULL ,
                location nvarchar(100) NULL ,
                manufacture nvarchar(50) NULL ,
                software nvarchar(50) NULL ,
                model nvarchar(50) NULL ,
                asset_status nvarchar(50) NULL ,
                
                description nvarchar(300) NULL,
                purchase_type nvarchar(150) NULL,
                purchase_date date NULL ,
                company nvarchar(100) NULL ,
                vendor nvarchar(100) NULL ,
                vendor_code nvarchar(100) NULL,
                invoice_no nvarchar(100) NULL ,
                rent_per_month nvarchar(100) NULL ,
                purchases_price nvarchar(100) NULL ,
             
                latest_inventory nvarchar(100) NULL ,
                asset_name nvarchar(100) NULL ,
                asset_assign nvarchar(100) NULL ,
                asset_assign_empid nvarchar(100) NULL ,
                remarks nvarchar(300) NULL ,
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                new_assets_uuid nvarchar(350) NULL
)


CREATE TABLE IPERISCOPE.dbo.tbl_ticket (
                sno bigint IDENTITY(1,1) NOT NULL,
                emp_id  nvarchar(20) NULL,
                emp_name  nvarchar(20) NULL,
                asset_type nvarchar(100) NULL,
                asset_serial nvarchar(50) NULL,
               
                location nvarchar(100) NULL ,
                assign_ticket nvarchar(50) NULL ,
                type_of_issue nvarchar(50) NULL ,
                email_id nvarchar(50) NULL ,
                ticket_date date NULL ,
             
                ticket_status nvarchar(100) NULL ,
                ticket_subject nvarchar(100) NULL ,
                priority nvarchar(100) NULL ,
                issue_discription nvarchar(100) NULL ,
                remarks nvarchar(300) NULL ,
                asset_tag nvarchar(150) NULL,
                asset_condition nvarchar(150) NULL
                
                add_user_name nvarchar(50) NULL,
                add_system_name nvarchar(100) NULL,
                add_ip_address nvarchar(30) NULL,
                add_date_time datetime NULL,
                update_user_name nvarchar(30) NULL,
                update_system_name nvarchar(100) NULL,
                update_ip_address nvarchar(30) NULL,
                update_date_time datetime NULL,
                status nvarchar(30) NULL,
                ticket_uuid nvarchar(350) NULL
)
CREATE TABLE IPERISCOPE.dbo.tbl_asset_subtable (
	sno int IDENTITY(0,1) NOT NULL,
	asset_id varchar(100) NULL,
	asset_tag varchar(100) NULL,
	software varchar(100) NULL
);

-- // Organistaion //

CREATE TABLE IPERISCOPE.dbo.tbl_Organisation (
	sno int IDENTITY(0,1) NOT NULL,
	org_id nvarchar(200) NULL,
	org_name varchar(300) NULL,
	org_country varchar(100) NULL,
	org_state varchar(100) NULL,
     org_city varchar(100) NULL,
	org_currency varchar(100) NULL,
	org_gst varchar(100) NULL,
	org_logo varchar(100) NULL
);

-- // Role Master //

CREATE TABLE IPERISCOPE.dbo.tbl_Roles_master (
     sno bigint IDENTITY(1,1) NOT NULL,
	role_id nvarchar(200) NULL,
     role nvarchar(100) NULL,
	remark nvarchar(200) NULL,
	asset varchar(100) NULL,
	asset_view nvarchar(100) NULL,
	asset_create nvarchar(100) NULL,
	asset_edit nvarchar(100) NULL,
	asset_delete varchar(100) NULL,
	vendor_contract varchar(100) NULL,
	vendor_contract_view varchar(100) NULL,
	vendor_contract_create varchar(100) NULL,
	vendor_contract_edit varchar(100) NULL,
	vendor_contract_delete varchar(100) NULL,
	ticket varchar(100) NULL,
	ticket_view varchar(100) NULL,
	ticket_create varchar(100) NULL,
	ticket_edit varchar(100) NULL,
	ticket_delete varchar(100) NULL,
	master varchar(100) NULL,
	master_view varchar(100) NULL,
	master_create varchar(100) NULL,
	master_edit varchar(100) NULL,
	master_delete varchar(100) NULL,
	[transaction] varchar(100) NULL,
	transaction_view varchar(100) NULL,
	transaction_create varchar(100) NULL,
	transaction_edit varchar(100) NULL,
	transaction_delete varchar(100) NULL,
	setting varchar(100) NULL,
	setting_view varchar(100) NULL,
	setting_create varchar(100) NULL,
	setting_edit varchar(100) NULL,
	setting_delete varchar(100) NULL,
	reports varchar(100) NULL,
	reports_view varchar(100) NULL,
	reports_create varchar(100) NULL,
	reports_edit varchar(100) NULL,
	reports_delete varchar(100) NULL
);






INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Leke', 'ALL', 'Lek');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'USD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Afghanis', 'AFN', '؋');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'ARS', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Guilders', 'AWG', 'ƒ');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'AUD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('New Manats', 'AZN', 'ман');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'BSD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'BBD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rubles', 'BYR', 'p.');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Euro', 'EUR', '€');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'BZD', 'BZ$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'BMD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Bolivianos', 'BOB', '$b');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Convertible Marka', 'BAM', 'KM');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pula', 'BWP', 'P');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Leva', 'BGN', 'лв');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Reais', 'BRL', 'R$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'GBP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'BND', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Riels', 'KHR', '៛');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'CAD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'KYD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'CLP', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Yuan Renminbi', 'CNY', '¥');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'COP', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Colón', 'CRC', '₡');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Kuna', 'HRK', 'kn');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'CUP', '₱');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Koruny', 'CZK', 'Kč');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Kroner', 'DKK', 'kr');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'DOP ', 'RD$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'XCD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'EGP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Colones', 'SVC', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'FKP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'FJD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Cedis', 'GHC', '¢');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'GIP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Quetzales', 'GTQ', 'Q');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'GGP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'GYD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Lempiras', 'HNL', 'L');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'HKD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Forint', 'HUF', 'Ft');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Kronur', 'ISK', 'kr');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'INR', 'Rp');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupiahs', 'IDR', 'Rp');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rials', 'IRR', '﷼');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'IMP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('New Shekels', 'ILS', '₪');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'JMD', 'J$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Yen', 'JPY', '¥');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'JEP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Tenge', 'KZT', 'лв');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Won', 'KPW', '₩');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Won', 'KRW', '₩');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Soms', 'KGS', 'лв');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Kips', 'LAK', '₭');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Lati', 'LVL', 'Ls');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'LBP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'LRD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Switzerland Francs', 'CHF', 'CHF');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Litai', 'LTL', 'Lt');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Denars', 'MKD', 'ден');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Ringgits', 'MYR', 'RM');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'MUR', '₨');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'MXN', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Tugriks', 'MNT', '₮');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Meticais', 'MZN', 'MT');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'NAD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'NPR', '₨');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Guilders', 'ANG', 'ƒ');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'NZD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Cordobas', 'NIO', 'C$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Nairas', 'NGN', '₦');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Krone', 'NOK', 'kr');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rials', 'OMR', '﷼');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'PKR', '₨');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Balboa', 'PAB', 'B/.');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Guarani', 'PYG', 'Gs');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Nuevos Soles', 'PEN', 'S/.');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'PHP', 'Php');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Zlotych', 'PLN', 'zł');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rials', 'QAR', '﷼');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('New Lei', 'RON', 'lei');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rubles', 'RUB', 'руб');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'SHP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Riyals', 'SAR', '﷼');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dinars', 'RSD', 'Дин.');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'SCR', '₨');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'SGD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'SBD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Shillings', 'SOS', 'S');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rand', 'ZAR', 'R');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'LKR', '₨');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Kronor', 'SEK', 'kr');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'SRD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pounds', 'SYP', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('New Dollars', 'TWD', 'NT$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Baht', 'THB', '฿');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'TTD', 'TT$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Lira', 'TRY', '₺');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Liras', 'TRL', '£');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dollars', 'TVD', '$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Hryvnia', 'UAH', '₴');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Pesos', 'UYU', '$U');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Sums', 'UZS', 'лв');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Bolivares Fuertes', 'VEF', 'Bs');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Dong', 'VND', '₫');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rials', 'YER', '﷼');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Zimbabwe Dollars', 'ZWD', 'Z$');
INSERT INTO IPERISCOPE.dbo.tbl_currency (name, code, symbol) VALUES ('Rupees', 'INR', '₹');
--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    address character varying(255),
    bio character varying(255),
    company character varying(255),
    mail character varying(255),
    name character varying(255)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car (
    bookings integer NOT NULL,
    rating integer NOT NULL,
    release_year integer NOT NULL,
    seater integer NOT NULL,
    warranty integer NOT NULL,
    id bigint NOT NULL,
    availability character varying(255),
    brand character varying(255),
    brand_icon character varying(255),
    color character varying(255),
    details character varying(255),
    drive_type character varying(255),
    engine_type character varying(255),
    extra_features character varying(255),
    fuel_efficiency character varying(255),
    image character varying(255),
    name character varying(255),
    price character varying(255),
    transmission character varying(255)
);


ALTER TABLE public.car OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.car_id_seq OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_id_seq OWNED BY public.car.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    messageid integer NOT NULL,
    email character varying(255),
    message character varying(255),
    name character varying(255)
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_messageid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_messageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_messageid_seq OWNER TO postgres;

--
-- Name: contact_messageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_messageid_seq OWNED BY public.contact.messageid;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    feedback_id integer NOT NULL,
    user_id integer,
    user_ratings integer,
    feedback_date timestamp(6) without time zone NOT NULL,
    feedback character varying(255),
    user_email character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- Name: feedback_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedback_feedback_id_seq OWNER TO postgres;

--
-- Name: feedback_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_feedback_id_seq OWNED BY public.feedback.feedback_id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    lat double precision,
    lng double precision,
    id bigint NOT NULL,
    address character varying(255),
    icon character varying(255),
    name character varying(255)
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_id_seq OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: slot_booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slot_booking (
    confirmation boolean,
    preferred_date date,
    booking_timestamp timestamp(6) without time zone NOT NULL,
    address character varying(255),
    brand character varying(255),
    email character varying(255) NOT NULL,
    name character varying(255),
    phone character varying(255),
    selected_car_details character varying(255),
    showroom_location character varying(255),
    status character varying(255),
    time_slot character varying(255)
);


ALTER TABLE public.slot_booking OWNER TO postgres;

--
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    registration_date date,
    user_id bigint NOT NULL,
    password character varying(255),
    user_address character varying(255),
    user_email character varying(255),
    user_mobile character varying(255),
    user_name character varying(255)
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- Name: user_details_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_details_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_details_user_id_seq OWNER TO postgres;

--
-- Name: user_details_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_details_user_id_seq OWNED BY public.user_details.user_id;


--
-- Name: car id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car ALTER COLUMN id SET DEFAULT nextval('public.car_id_seq'::regclass);


--
-- Name: contact messageid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN messageid SET DEFAULT nextval('public.contact_messageid_seq'::regclass);


--
-- Name: feedback feedback_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN feedback_id SET DEFAULT nextval('public.feedback_feedback_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: user_details user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details ALTER COLUMN user_id SET DEFAULT nextval('public.user_details_user_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (admin_id, address, bio, company, mail, name) FROM stdin;
1	Paris, France	Bio: Passionate about technology and innovation.	TechCorp	marie.dupont@example.com	Marie Dupont
\.


--
-- Data for Name: car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car (bookings, rating, release_year, seater, warranty, id, availability, brand, brand_icon, color, details, drive_type, engine_type, extra_features, fuel_efficiency, image, name, price, transmission) FROM stdin;
120	4	2023	5	5	1	in-stock	Renault	/assets/images/renocaricon.jpg	black	A spacious SUV with a powerful engine.	awd	diesel	["Panoramic Sunroof", "All-Wheel Drive", "Automatic Parking"]	15	/assets/carImages/renault-koleos.jpg	Renault Koleos	₹22 Lakhs	automatic
200	3	2023	4	3	2	pre-order	Renault	/assets/images/renocaricon.jpg	blue	A compact car with advanced technology.	fwd	petrol	["Automatic Climate Control", "LED Headlights", "Lane Departure Warning"]	20	/assets/carImages/renault-clio2.jpg	Renault Clio	₹8 Lakhs	manual
150	4	2023	5	5	3	in-stock	Renault	/assets/images/renocaricon.jpg	red	A stylish crossover perfect for the city.	rwd	diesel	["Touchscreen Infotainment", "360-degree Camera", "Front Parking Sensors"]	18	/assets/carImages/renault-captur2.jpg	Renault Captur	₹14 Lakhs	automatic
100	5	2023	5	3	4	in-stock	Renault	/assets/images/renocaricon.jpg	white	A dynamic hatchback with advanced features.	fwd	petrol	["Wireless Charging", "Adaptive Cruise Control", "Heated Seats"]	20	/assets/carImages/renault-megane2.webp	Renault Megane	₹16 Lakhs	automatic
180	2	2023	4	5	5	in-stock	Renault	/assets/images/renocaricon.jpg	grey	A small city car with big personality.	rwd	electric	["Electric Power Steering", "Smartphone Connectivity", "Bluetooth Audio"]	20	/assets/carImages/renault-twingo2.jpg	Renault Twingo	₹6 Lakhs	manual
80	4	2023	5	3	6	pre-order	Renault	/assets/images/renocaricon.jpg	black	A compact electric car with eco-friendly features.	fwd	electric	["Regenerative Braking", "Infotainment System", "Parking Assist"]	20+	/assets/carImages/renault-zoe.jpg	Renault Zoe	₹15 Lakhs	automatic
40	5	2023	7	5	7	in-stock	Renault	/assets/images/renocaricon.jpg	blue	A luxurious family SUV with high-tech interiors.	awd	diesel	["Massaging Seats", "Advanced Driver Assistance", "Adaptive Headlights"]	15	/assets/carImages/renault-espace2.jpg	Renault Espace	₹25 Lakhs	automatic
110	3	2023	5	7	8	pre-order	Renault	/assets/images/renocaricon.jpg	grey	A versatile SUV with excellent road handling.	rwd	petrol	["Automatic Emergency Braking", "Keyless Entry", "Bluetooth Connectivity"]	10	/assets/carImages/renault-kadjar.jpg	Renault Kadjar	₹18 Lakhs	manual
130	5	2023	5	7	9	in-stock	Renault	/assets/images/renocaricon.jpg	red	A coupe-SUV that offers both style and performance.	awd	diesel	["Sport Mode", "Panoramic Roof", "Wireless Charging"]	18	/assets/carImages/renault-arkana.webp	Renault Arkana	₹22 Lakhs	automatic
90	2	2023	4	3	10	discontinued	Renault	/assets/images/renocaricon.jpg	black	A reliable sedan with a spacious interior.	fwd	petrol	["Cruise Control", "Touchscreen Display", "Automatic Headlights"]	10	/assets/carImages/renault-logan3.jpg	Renault Logan	₹10 Lakhs	manual
170	3	2023	5	5	11	in-stock	Renault	/assets/images/renocaricon.jpg	yellow	A practical and affordable hatchback.	fwd	petrol	["Reverse Parking Camera", "Eco Mode", "Daytime Running Lights"]	15	/assets/carImages/renault-sandero2.jpg	Renault Sandero	₹7 Lakhs	manual
75	4	2023	5	5	12	pre-order	Renault	/assets/images/renocaricon.jpg	white	A mid-size sedan with sleek lines and modern features.	rwd	diesel	["Leather Seats", "Keyless Start", "Rain-Sensing Wipers"]	18	/assets/carImages/renault-fluence.webp	Renault Fluence	₹14 Lakhs	automatic
150	4	2023	5	5	13	in-stock	Nissan	/assets/images/ok1.png	silver	A sleek sedan with great fuel economy.	fwd	petrol	["ProPilot Assist", "Heated Seats", "Blind Spot Monitoring"]	15	/assets/carImages/nissan-altima2.jpg	Nissan Altima	₹20 Lakhs	automatic
200	4	2023	5	5	14	in-stock	Nissan	/assets/images/ok1.png	blue	A sporty compact car for city driving.	fwd	petrol	["Apple CarPlay", "Keyless Entry", "Rearview Camera"]	18	/assets/carImages/nissan-juke3.avif	Nissan Juke	₹12 Lakhs	manual
180	3	2023	5	3	15	pre-order	Nissan	/assets/images/ok1.png	black	A compact sedan with an efficient engine.	fwd	petrol	["Bluetooth Connectivity", "Lane Departure Warning", "Automatic Climate Control"]	22	/assets/carImages/nissan-sentra.jpg	Nissan Sentra	₹10 Lakhs	manual
120	4	2023	5	5	16	in-stock	Nissan	/assets/images/ok1.png	green	An electric car with an affordable price.	fwd	electric	["Electric Powertrain", "Advanced Safety Features", "Wireless Charging"]	20+	/assets/carImages/nissan-leaf.jpg	Nissan Leaf	₹22 Lakhs	automatic
130	5	2023	5	5	17	in-stock	Nissan	/assets/images/ok1.png	red	A comfortable SUV with great family features.	awd	petrol	["All-Wheel Drive", "Heated Steering Wheel", "360-Degree Camera"]	18	/assets/carImages/nissan-rogue2.jpg	Nissan Rogue	₹26 Lakhs	automatic
100	4	2023	5	7	18	pre-order	Nissan	/assets/images/ok1.png	white	A luxurious mid-size SUV with bold styling.	awd	petrol	["Panoramic Sunroof", "Dual-Zone Climate Control", "Leather Upholstery"]	16	/assets/carImages/nissan-murano.avif	Nissan Murano	₹32 Lakhs	automatic
90	5	2023	7	5	19	in-stock	Nissan	/assets/images/ok1.png	blue	A family-friendly SUV with advanced safety features.	awd	diesel	["Family-Friendly Seating", "Advanced Safety Features", "Tow Package"]	14	/assets/carImages/nissan-pathfinder2.jpg	Nissan Pathfinder	₹28 Lakhs	automatic
85	4	2023	5	5	20	pre-order	Nissan	/assets/images/ok1.png	black	A robust SUV with off-road capabilities.	awd	diesel	["Off-Road Capability", "Smart Rearview Mirror", "Adaptive Headlights"]	16	/assets/carImages/nissan-xtrail.png	Nissan X-Trail	₹25 Lakhs	manual
60	5	2023	5	7	21	in-stock	Nissan	/assets/images/ok1.png	grey	A powerful pickup truck for heavy-duty use.	awd	diesel	["Tow Hooks", "Large Cargo Bed", "Heated Seats"]	10	/assets/carImages/nissan-titan2.jpg	Nissan Titan	₹35 Lakhs	automatic
140	4	2023	5	5	22	in-stock	Nissan	/assets/images/ok1.png	red	A compact crossover with great tech features.	fwd	petrol	["Intelligent Cruise Control", "Nissan Connect", "Heated Mirrors"]	18	/assets/carImages/nissan-qashqai2.jpg	Nissan Qashqai	₹18 Lakhs	manual
50	5	2023	2	3	23	in-stock	Nissan	/assets/images/ok1.png	yellow	A performance sports car with exceptional handling.	rwd	petrol	["Sport Mode", "Rear Differential Lock", "Leather Upholstery"]	12	/assets/carImages/nissan-370z2.webp	Nissan 370Z	₹45 Lakhs	manual
30	5	2023	2	7	24	in-stock	Nissan	/assets/images/ok1.png	black	A high-performance sports car with iconic status.	awd	petrol	["Twin-Turbocharged V6", "Launch Control", "Carbon Fiber Interior"]	8	/assets/carImages/nissan-gtr3.jpg	Nissan GT-R	₹1.5 Crore	automatic
150	4	2023	7	5	25	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	white	A versatile SUV for family adventures.	awd	petrol	["7-Passenger Seating", "All-Wheel Drive", "Apple CarPlay"]	13	/assets/carImages/mitsubishi-outlander.jpg	Mitsubishi Outlander	₹26 Lakhs	automatic
180	4	2023	5	3	26	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	black	A performance-driven sedan with style.	fwd	petrol	["Sporty Handling", "Bluetooth Connectivity", "Keyless Entry"]	15	/assets/carImages/mitsubishi-lancer.jpg	Mitsubishi Lancer	₹20 Lakhs	manual
160	4	2023	5	5	27	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	red	A stylish compact SUV with impressive tech.	awd	petrol	["Panoramic Sunroof", "Leather Upholstery", "Apple CarPlay"]	14	/assets/carImages/mitsubishi-eclipse-cross.jpg	Mitsubishi Eclipse Cross	₹22 Lakhs	automatic
200	4	2023	5	5	28	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	blue	A compact crossover with sporty looks.	fwd	petrol	["Smartphone Integration", "Heated Seats", "Adaptive Cruise Control"]	17	/assets/carImages/mitsubishi-asx.jpg	Mitsubishi ASX	₹18 Lakhs	manual
120	5	2023	5	5	29	pre-order	Mitsubishi	/assets/images/mistcarlogo.png	grey	A rugged 4x4 with off-road capabilities.	awd	diesel	["4WD Capability", "Leather Seats", "Touchscreen Infotainment"]	12	/assets/carImages/mitsubishi-pajero.jpg	Mitsubishi Pajero	₹35 Lakhs	automatic
250	3	2023	5	3	30	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	green	A small city car with excellent fuel efficiency.	fwd	petrol	["Fuel Efficient", "Compact Size", "Bluetooth Connectivity"]	18	/assets/carImages/mitsubishi-mirage.jpg	Mitsubishi Mirage	₹10 Lakhs	manual
130	4	2023	5	3	31	pre-order	Mitsubishi	/assets/images/mistcarlogo.png	black	A mid-size sedan with elegant styling.	fwd	petrol	["Modern Design", "Touchscreen Display", "Automatic Climate Control"]	14	/assets/carImages/mitsubishi-galant2.jpg	Mitsubishi Galant	₹22 Lakhs	automatic
80	5	2023	5	7	32	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	silver	An off-road SUV with luxurious interiors.	awd	diesel	["Luxury Interiors", "Off-Road Ready", "Heated Seats"]	11	/assets/carImages/mitsubishi-montero-sport.avif	Mitsubishi Montero Sport	₹40 Lakhs	automatic
50	4	2023	5	5	33	pre-order	Mitsubishi	/assets/images/mistcarlogo.png	blue	A plug-in hybrid SUV for eco-conscious drivers.	awd	hybrid	["Plug-In Hybrid", "Eco-Friendly", "All-Wheel Drive"]	20	/assets/carImages/mitsubishi-outlander-phev2.jpg	Mitsubishi Outlander PHEV	₹45 Lakhs	automatic
90	4	2023	5	5	34	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	grey	A tough pickup truck for heavy-duty tasks.	4wd	diesel	["Tough Pickup", "4x4 Capabilities", "Cargo Bed"]	12	/assets/carImages/mitsubishi-l2002.webp	Mitsubishi L200	₹28 Lakhs	manual
150	4	2023	5	3	35	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	orange	A compact SUV with a comfortable interior.	fwd	petrol	["Compact SUV", "Bluetooth Connectivity", "Adaptive Cruise Control"]	15	/assets/carImages/mitsubishi-rvr.jpg	Mitsubishi RVR	₹24 Lakhs	automatic
180	3	2023	5	3	36	in-stock	Mitsubishi	/assets/images/mistcarlogo.png	white	A compact sedan with a modern design.	fwd	petrol	["Stylish Design", "Bluetooth Connectivity", "Fuel-Efficient"]	17	/assets/carImages/mitsubishi-mirage-g42.jpg	Mitsubishi Mirage G4	₹12 Lakhs	manual
40	5	2023	2	5	37	pre-order	Mitsubishi	/assets/images/mistcarlogo.png	yellow	A sports car with great performance and style.	rwd	petrol	["Turbocharged Engine", "Sporty Design", "Advanced Performance"]	9	/assets/carImages/mitsubishi-3000gt2.jpg	Mitsubishi 3000GT	₹50 Lakhs	manual
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (messageid, email, message, name) FROM stdin;
1	john.doe@example.com	Hello, I have a query about your product.	John Doe
2	jane.smith@example.com	I would like to inquire about your services.	Jane Smith
3	michael.johnson@example.com	Can you provide more details on your pricing plans?	Michael Johnson
4	emily.davis@example.com	I need help with my account.	Emily Davis
5	chris.lee@example.com	Is there any way to update my subscription?	Chris Lee
6	sarah.white@example.com	I have a technical issue with your service.	Sarah White
7	david.brown@example.com	Can I get a refund for my recent purchase?	David Brown
8	olivia.green@example.com	I’m interested in becoming a partner.	Olivia Green
9	daniel.harris@example.com	How can I cancel my subscription?	Daniel Harris
10	sophia.clark@example.com	Please help me with resetting my password.	Sophia Clark
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (feedback_id, user_id, user_ratings, feedback_date, feedback, user_email, user_name) FROM stdin;
2	1	5	2025-01-23 16:51:17.171905	I absolutely love the service! Everything works perfectly and the interface is smooth. I will definitely continue using it.	john.doe@example.com	John Doe
3	2	4	2025-01-23 16:51:17.171905	Overall, a very good experience. The product works well, though I had some minor issues with notifications not working properly at first. Still, I would recommend it.	jane.smith@example.com	Jane Smith
4	3	3	2025-01-23 16:51:17.171905	The service is generally okay, but it lacks some key features that I was hoping for. It’s functional, but not great.	michael.johnson@example.com	Michael Johnson
5	4	1	2025-01-23 16:51:17.171905	I had a horrible experience. The app crashed multiple times, and the support team never got back to me. I would not recommend it to anyone.	emily.davis@example.com	Emily Davis
6	5	3	2025-01-23 16:51:17.171905	The product is decent but needs improvement. The design is outdated, and some features are hard to find. Not bad, but it could be much better.	chris.lee@example.com	Chris Lee
7	6	5	2025-01-23 16:51:17.171905	Absolutely fantastic! It’s so easy to use, and the response time is really fast. It’s definitely one of the best I’ve used in this category.	sarah.white@example.com	Sarah White
8	7	2	2025-01-23 16:51:17.171905	The app is okay, but there are too many bugs. It crashes frequently and has a lot of glitches that make it frustrating to use.	david.brown@example.com	David Brown
9	8	3	2025-01-23 16:51:17.171905	The service is generally good, but it lacks some important functionality. It works well for simple tasks, but for more advanced ones, it’s just not up to the mark.	olivia.green@example.com	Olivia Green
10	9	4	2025-01-23 16:51:17.171905	I’m impressed by the customer support team. They helped me resolve my issue very quickly, and the app works well now. A few minor tweaks and it would be perfect.	daniel.harris@example.com	Daniel Harris
11	10	2	2025-01-23 16:51:17.171905	The app is very slow, and I often experience delays when trying to load data. While the concept is great, the performance needs a lot of work.	sophia.clark@example.com	Sophia Clark
12	11	5	2025-01-23 16:51:17.171905	I had an amazing experience. The interface is sleek, easy to navigate, and the features are just what I was looking for. Definitely would recommend it.	lucas.walker@example.com	Lucas Walker
13	12	3	2025-01-23 16:51:17.171905	I think the app is useful, but it could use more customization options. Right now, it feels a little too rigid for my needs, but it works fine for the most part.	isabella.robinson@example.com	Isabella Robinson
14	13	1	2025-01-23 16:51:17.171905	I had a terrible experience. I couldn’t even get past the login screen, and support wasn’t able to help me at all. Extremely disappointed.	henry.young@example.com	Henry Young
15	14	3	2025-01-23 16:51:17.171905	Great user interface and functionality, but it often freezes when I try to upload files. This makes it difficult to use on a regular basis.	mia.king@example.com	Mia King
16	15	3	2025-01-23 16:51:17.171905	The product does what it’s supposed to do, but it’s not groundbreaking. It’s stable and functional, but I wish it had more innovative features.	james.lee@example.com	James Lee
17	16	5	2025-01-23 16:51:17.171905	Amazing experience! The design is gorgeous, and the app runs smoothly. I couldn’t ask for more.	ava.miller@example.com	Ava Miller
18	17	4	2025-01-23 16:51:17.171905	The app is very reliable and easy to use. However, it could use a few more tutorials to guide new users, especially when using advanced features.	benjamin.wilson@example.com	Benjamin Wilson
19	18	3	2025-01-23 16:51:17.171905	I’m happy with the service, but I do wish there were more language options available. Right now, it’s limiting for non-English speakers.	charlotte.perez@example.com	Charlotte Perez
20	19	2	2025-01-23 16:51:17.171905	The app is okay, but the features feel outdated. I believe it could really benefit from some fresh design ideas and improvements.	samuel.scott@example.com	Samuel Scott
21	20	4	2025-01-23 16:51:17.171905	It’s been a great experience so far! The product works well, and I’m excited to see future updates. It’s almost perfect.	lily.adams@example.com	Lily Adams
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (lat, lng, id, address, icon, name) FROM stdin;
28.6358	77.2245	1	Connaught Place, New Delhi, Delhi, 110001	location-icon-1.png	New Delhi - Connaught Place
19.059	72.8481	2	Bandra West, Mumbai, Maharashtra, 400050	location-icon-2.png	Mumbai - Bandra
12.9716	77.5975	3	MG Road, Bangalore, Karnataka, 560001	location-icon-3.png	Bengaluru - MG Road
13.0674	80.2364	4	Nungambakkam, Chennai, Tamil Nadu, 600034	location-icon-4.png	Chennai - Nungambakkam
22.5427	88.3498	5	Park Street, Kolkata, West Bengal, 700016	location-icon-5.png	Kolkata - Park Street
\.


--
-- Data for Name: slot_booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slot_booking (confirmation, preferred_date, booking_timestamp, address, brand, email, name, phone, selected_car_details, showroom_location, status, time_slot) FROM stdin;
t	2025-01-12	2025-01-12 20:31:29.13248	Wano Arc	\N	monkeydluffy@gmail.com	Monkey D Luffy	6365643643	Renault Koleos	madurai	\N	afternoon
t	2025-01-12	2025-01-12 20:33:28.276524	Logue town	\N	zorotheexplorer@gmail.com	Roronoa Zoro	5464364697	Mitsubishi Eclipse Cross	madurai	\N	afternoon
t	2025-01-13	2025-01-13 22:22:20.296693	Dressroza	\N	mingo@gmail.com	Donquixote Donflamingo	6435468733	Mitsubishi ASX	chennai	\N	evening
\.


--
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (registration_date, user_id, password, user_address, user_email, user_mobile, user_name) FROM stdin;
2025-01-20	1	password123	123 Main St, New Delhi, India	john.doe@example.com	9876543210	John Doe
2025-01-19	2	password123	456 Park Ave, Mumbai, India	jane.smith@example.com	9876543220	Jane Smith
2025-01-18	3	password123	789 MG Road, Bengaluru, India	michael.johnson@example.com	9876543230	Michael Johnson
2025-01-17	4	password123	321 Nungambakkam, Chennai, India	emily.davis@example.com	9876543240	Emily Davis
2025-01-16	5	password123	654 Park Street, Kolkata, India	chris.lee@example.com	9876543250	Chris Lee
2025-01-15	6	password123	987 Banjara Hills, Hyderabad, India	sarah.white@example.com	9876543260	Sarah White
2025-01-14	7	password123	123 Koregaon Park, Pune, India	david.brown@example.com	9876543270	David Brown
2025-01-13	8	password123	456 S.G. Highway, Ahmedabad, India	olivia.green@example.com	9876543280	Olivia Green
2025-01-12	9	password123	789 Marine Drive, Kochi, India	daniel.harris@example.com	9876543290	Daniel Harris
2025-01-11	10	password123	321 Sector 17, Chandigarh, India	sophia.clark@example.com	9876543300	Sophia Clark
2025-01-10	11	password123	123 Connaught Place, New Delhi, India	lucas.walker@example.com	9876543310	Lucas Walker
2025-01-09	12	password123	456 Bandra West, Mumbai, India	isabella.robinson@example.com	9876543320	Isabella Robinson
2025-01-08	13	password123	789 MG Road, Bengaluru, India	henry.young@example.com	9876543330	Henry Young
2025-01-07	14	password123	123 Nungambakkam, Chennai, India	mia.king@example.com	9876543340	Mia King
2025-01-06	15	password123	456 Park Street, Kolkata, India	james.lee@example.com	9876543350	James Lee
2025-01-05	16	password123	789 Banjara Hills, Hyderabad, India	ava.miller@example.com	9876543360	Ava Miller
2025-01-04	17	password123	321 Koregaon Park, Pune, India	benjamin.wilson@example.com	9876543370	Benjamin Wilson
2025-01-03	18	password123	654 S.G. Highway, Ahmedabad, India	charlotte.perez@example.com	9876543380	Charlotte Perez
2025-01-02	19	password123	123 Marine Drive, Kochi, India	samuel.scott@example.com	9876543390	Samuel Scott
2025-01-01	20	password123	456 Sector 17, Chandigarh, India	lily.adams@example.com	9876543400	Lily Adams
\.


--
-- Name: car_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_id_seq', 37, true);


--
-- Name: contact_messageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_messageid_seq', 10, true);


--
-- Name: feedback_feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_feedback_id_seq', 21, true);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_id_seq', 5, true);


--
-- Name: user_details_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_details_user_id_seq', 20, true);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- Name: car car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (messageid);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedback_id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: slot_booking slot_booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_booking
    ADD CONSTRAINT slot_booking_pkey PRIMARY KEY (email);


--
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (user_id);


--
-- Name: feedback fk95hegocikqd5foguk7jkvkgpa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fk95hegocikqd5foguk7jkvkgpa FOREIGN KEY (user_id) REFERENCES public.user_details(user_id);


--
-- PostgreSQL database dump complete
--


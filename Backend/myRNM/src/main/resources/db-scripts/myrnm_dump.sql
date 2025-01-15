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
-- Name: slot_bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slot_bookings (
    email character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    address text,
    preferred_date date NOT NULL,
    time_slot character varying(20) NOT NULL,
    showroom_location character varying(50) NOT NULL,
    confirmation boolean DEFAULT false,
    booking_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    selected_car_details text
);


ALTER TABLE public.slot_bookings OWNER TO postgres;

--
-- Data for Name: slot_bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slot_bookings (email, name, phone, address, preferred_date, time_slot, showroom_location, confirmation, booking_timestamp, selected_car_details) FROM stdin;
monkeydluffy@gmail.com	Monkey D Luffy	6365643643	Wano Arc	2025-01-12	afternoon	madurai	t	2025-01-12 20:31:29.13248	Renault Koleos
zorotheexplorer@gmail.com	Roronoa Zoro 	5464364697	Logue town	2025-01-12	afternoon	madurai	t	2025-01-12 20:33:28.276524	Mitsubishi Eclipse Cross
mingo@gmail.com	Donquixote Donflamingo	6435468733	Dressroza	2025-01-13	evening	chennai	t	2025-01-13 22:22:20.296693	Mitsubishi ASX
\.


--
-- Name: slot_bookings slot_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slot_bookings
    ADD CONSTRAINT slot_bookings_pkey PRIMARY KEY (email);


--
-- PostgreSQL database dump complete
--


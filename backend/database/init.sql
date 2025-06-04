--
-- PostgreSQL database dump
--

-- Dumped from database version 17.1 (Postgres.app)
-- Dumped by pg_dump version 17.1 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0;
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
-- Name: booklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booklist (
    bookid integer NOT NULL,
    booktitle character varying(255),
    authorname character varying(255),
    status character varying(255),
    imageurl character varying(512)
);


ALTER TABLE public.booklist OWNER TO postgres;

--
-- Name: booklist_bookid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booklist_bookid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booklist_bookid_seq OWNER TO postgres;

--
-- Name: booklist_bookid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booklist_bookid_seq OWNED BY public.booklist.bookid;


--
-- Name: readlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readlist (
    bookid integer NOT NULL,
    booktitle character varying(255),
    authorname character varying(255),
    status character varying(255),
    imageurl character varying(512)
);


ALTER TABLE public.readlist OWNER TO postgres;

--
-- Name: readlist_bookid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.readlist_bookid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.readlist_bookid_seq OWNER TO postgres;

--
-- Name: readlist_bookid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.readlist_bookid_seq OWNED BY public.readlist.bookid;


--
-- Name: booklist bookid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booklist ALTER COLUMN bookid SET DEFAULT nextval('public.booklist_bookid_seq'::regclass);


--
-- Name: readlist bookid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readlist ALTER COLUMN bookid SET DEFAULT nextval('public.readlist_bookid_seq'::regclass);


--
-- Name: booklist booklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booklist
    ADD CONSTRAINT booklist_pkey PRIMARY KEY (bookid);


--
-- Name: readlist readlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readlist
    ADD CONSTRAINT readlist_pkey PRIMARY KEY (bookid);


--
-- Name: readlist unique_book; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.readlist
    ADD CONSTRAINT unique_book UNIQUE (booktitle, authorname);


--
-- Name: booklist unique_book_list; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booklist
    ADD CONSTRAINT unique_book_list UNIQUE (booktitle, authorname);


--
-- PostgreSQL database dump complete
--


PGDMP      7                |            practical_test    14.11 (Homebrew)    16.0     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16385    practical_test    DATABASE     p   CREATE DATABASE practical_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE practical_test;
                postgres    false            �            1259    16451    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    gender public.enum_users_gender,
    phone_no character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16450    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            C           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            �           2604    16454    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            <          0    16451    users 
   TABLE DATA           x   COPY public.users (id, full_name, email, password, gender, phone_no, "createdAt", "updatedAt", "deletedAt") FROM stdin;
    public          postgres    false    210   �       D           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    209            �           2606    16458    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            <   y  x���MS�@����)<xkZ�]�T(a�
!
M3D�-���Ӈy)c���g�y���,�v�ǁl[���Y����z#��d���:K@��:H���r6����^R�2Ɔ�)}�U����&���?
�	��,��`U=b6A������Q�A�]#Z�6��i�B����O}��y.��4��.N�!t��2���D�A;�d1[��L��,�Ih&�y����}|+���j�	'���Z+�Y���Ť�:�h�T�u�����Ӡ�3}O�b}�UL|?
�#���
���2s�H��"��ʅFT����5����q���F�G�\��}}��|V���>E[~���>��a?8O�m[P��"4D5�!�j�o��ϰ�j}L緺     
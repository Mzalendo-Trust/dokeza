# Generated by Django 3.0.8 on 2020-07-20 12:46

import datetime
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('first_name', models.CharField(max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(max_length=30, verbose_name='last name')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Institution',
                'verbose_name_plural': 'Institutions',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(blank=True, max_length=500, null=True)),
                ('gender', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Male'), (2, 'Female')], null=True, verbose_name='gender')),
                ('picture', models.ImageField(blank=True, height_field='height_field', null=True, upload_to='profile_pics/', width_field='width_field')),
                ('bio', models.TextField(blank=True, max_length=500, null=True)),
                ('county_residence', models.PositiveSmallIntegerField(choices=[(1, 'Baringo County'), (2, 'Bomet County'), (3, 'Bungoma County'), (4, 'Busia County'), (5, 'Diaspora'), (6, 'Elgeyo Marakwet County'), (7, 'Embu County'), (8, 'Garissa County'), (9, 'Homa Bay County'), (10, 'Isiolo County'), (11, 'Kajiado County'), (12, 'Kakamega County'), (13, 'Kericho County'), (14, 'Kiambu County'), (15, 'Kilifi County'), (16, 'Kirinyaga County'), (17, 'Kisii County'), (18, 'Kisumu County'), (19, 'Kitui County'), (20, 'Kwale County'), (21, 'Laikipia County'), (22, 'Lamu County'), (23, 'Machakos County'), (24, 'Makueni County'), (25, 'Mandera County'), (26, 'Meru County'), (27, 'Migori County'), (28, 'Marsabit County'), (29, 'Mombasa County'), (30, 'Muranga County'), (31, 'Nairobi County'), (32, 'Nakuru County'), (33, 'Nandi County'), (34, 'Narok County'), (35, 'Nyamira County'), (36, 'Nyandarua County'), (37, 'Nyeri County'), (38, 'Samburu County'), (39, 'Siaya County'), (40, 'Taita Taveta County'), (41, 'Tana River County'), (42, 'Tharaka Nithi County'), (43, 'Trans Nzoia County'), (44, 'Turkana County'), (45, 'Uasin Gishu County'), (46, 'Vihiga County'), (47, 'Wajir County'), (48, 'West Pokot County')], default=5, verbose_name='County of Residence')),
                ('country', django_countries.fields.CountryField(default='KE', help_text='If you are in the Diaspora, what country are you in?', max_length=2)),
                ('county_interest', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Baringo County'), (2, 'Bomet County'), (3, 'Bungoma County'), (4, 'Busia County'), (5, 'Diaspora'), (6, 'Elgeyo Marakwet County'), (7, 'Embu County'), (8, 'Garissa County'), (9, 'Homa Bay County'), (10, 'Isiolo County'), (11, 'Kajiado County'), (12, 'Kakamega County'), (13, 'Kericho County'), (14, 'Kiambu County'), (15, 'Kilifi County'), (16, 'Kirinyaga County'), (17, 'Kisii County'), (18, 'Kisumu County'), (19, 'Kitui County'), (20, 'Kwale County'), (21, 'Laikipia County'), (22, 'Lamu County'), (23, 'Machakos County'), (24, 'Makueni County'), (25, 'Mandera County'), (26, 'Meru County'), (27, 'Migori County'), (28, 'Marsabit County'), (29, 'Mombasa County'), (30, 'Muranga County'), (31, 'Nairobi County'), (32, 'Nakuru County'), (33, 'Nandi County'), (34, 'Narok County'), (35, 'Nyamira County'), (36, 'Nyandarua County'), (37, 'Nyeri County'), (38, 'Samburu County'), (39, 'Siaya County'), (40, 'Taita Taveta County'), (41, 'Tana River County'), (42, 'Tharaka Nithi County'), (43, 'Trans Nzoia County'), (44, 'Turkana County'), (45, 'Uasin Gishu County'), (46, 'Vihiga County'), (47, 'Wajir County'), (48, 'West Pokot County')], help_text='Many Kenyans live in one county and are interested in another.', null=True, verbose_name='County of Interest')),
                ('is_editor', models.BooleanField(default=False, help_text='Designates whether the user can create, draft and edit bills.', verbose_name='editor status')),
                ('is_member_of_parliament', models.BooleanField(default=False, help_text='Designates whether the user as an MP in Kenya.', verbose_name='Member of Parliament')),
                ('national_assembly', models.BooleanField(default=False, verbose_name='National Assembly')),
                ('constituency', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Changamwe'), (2, 'Jomvu'), (3, 'Kisauni'), (4, 'Nyali'), (5, 'Likoni'), (6, 'Mvita'), (7, 'Msambweni'), (8, 'Lunga Lunga'), (9, 'Matuga'), (10, 'Kinango'), (11, 'Kilifi North'), (12, 'Kilifi South'), (13, 'Kaloleni'), (14, 'Rabai'), (15, 'Ganze'), (16, 'Malindi'), (17, 'Magarini'), (18, 'Garsen'), (19, 'Galole'), (20, 'Bura'), (21, 'Lamu East'), (22, 'Lamu West'), (23, 'Taveta'), (24, 'Wundanyi'), (25, 'Mwatate'), (26, 'Voi'), (27, 'Garissa Township'), (28, 'Balambala'), (29, 'Lagdera'), (30, 'Dadaab'), (31, 'Fafi'), (32, 'Ijara'), (33, 'Wajir North'), (34, 'Wajir East'), (35, 'Tarbaj'), (36, 'Wajir West'), (37, 'Eldas'), (38, 'Wajir South'), (39, 'Mandera West'), (40, 'Banissa'), (41, 'Mandera North'), (42, 'Mandera South'), (43, 'Mandera East'), (44, 'Lafey'), (45, 'Moyale'), (46, 'North Horr'), (47, 'Saku'), (48, 'Laisamis'), (49, 'Isiolo North'), (50, 'Isiolo South'), (51, 'Igembe South'), (52, 'Igembe Central'), (53, 'Igembe North'), (54, 'Tigania West'), (55, 'Tigania East'), (56, 'North Imenti'), (57, 'Buuri'), (58, 'Central Imenti'), (59, 'South Imenti'), (60, 'Maara'), (61, "Chuka/'Igambang'ombe"), (62, 'Tharaka'), (63, 'Manyatta'), (64, 'Runyenjes'), (65, 'Mbeere South'), (66, 'Mbeere North'), (67, 'Mwingi North'), (68, 'Mwingi West'), (69, 'Mwingi Central'), (70, 'Kitui West'), (71, 'Kitui Rural'), (72, 'Kitui Central'), (73, 'Kitui East'), (74, 'Kitui South'), (75, 'Masinga'), (76, 'Yatta'), (77, 'Kangundo'), (78, 'Matungulu'), (79, 'Kathiani'), (80, 'Mavoko'), (81, 'Machakos Town'), (82, 'Mwala.'), (83, 'Mbooni'), (84, 'Kilome'), (85, 'Kaiti'), (86, 'Makueni'), (87, 'Kibwezi West'), (88, 'Kibwezi East'), (89, 'Kinangop'), (90, 'Kipipiri'), (91, 'Ol Kalou'), (92, 'Ol Jorok'), (93, 'Ndaragwa.'), (94, 'Tetu'), (95, 'Kieni'), (96, 'Mathira'), (97, 'Othaya'), (98, 'Mukurweini'), (99, 'Nyeri Town'), (100, 'Mwea'), (101, 'Gichugu'), (102, 'Ndia'), (103, 'Kirinyaga Central'), (104, 'Kangema'), (105, 'Mathioya'), (106, 'Kiharu'), (107, 'Kigumo'), (108, 'Maragwa'), (109, 'Kandara'), (110, 'Gatanga.'), (111, 'Gatundu South'), (112, 'Gatundu North'), (113, 'Juja'), (114, 'Thika Town'), (115, 'Ruiru'), (116, 'Githunguri'), (117, 'Kiambu'), (118, 'Kiambaa'), (119, 'Kabete'), (120, 'Kikuyu'), (121, 'Limuru'), (122, 'Lari'), (123, 'Turkana North'), (124, 'Turkana West'), (125, 'Turkana Central'), (126, 'Loima'), (127, 'Turkana South'), (128, 'Turkana East'), (129, 'Kapenguria'), (130, 'Sigor'), (131, 'Kacheliba'), (132, 'Pokot South'), (133, 'Samburu West'), (134, 'Samburu North'), (135, 'Samburu East'), (136, 'Kwanza'), (137, 'Endebess'), (138, 'Saboti'), (139, 'Kiminini'), (140, 'Cherangany'), (141, 'Soy'), (142, 'Turbo'), (143, 'Moiben'), (144, 'Ainabkoi'), (145, 'Kapseret'), (146, 'Kesses'), (147, 'Marakwet East'), (148, 'Marakwet West'), (149, 'Keiyo North'), (150, 'Keiyo South'), (151, 'Tinderet'), (152, 'Aldai'), (153, 'Nandi Hills'), (154, 'Chesumei'), (155, 'Emgwen'), (156, 'Mosop'), (157, 'Tiaty'), (158, 'Baringo North'), (159, 'Baringo Central'), (160, 'Baringo South'), (161, 'Mogotio'), (162, 'Eldama Ravine'), (163, 'Laikipia West'), (164, 'Laikipia East'), (165, 'Laikipia North'), (166, 'Molo'), (167, 'Njoro'), (168, 'Naivasha'), (169, 'Gilgil'), (170, 'Kuresoi South'), (171, 'Kuresoi North'), (172, 'Subukia'), (173, 'Rongai'), (174, 'Bahati'), (175, 'Nakuru Town West'), (176, 'Nakuru Town East'), (177, 'Kilgoris'), (178, 'Emurua Dikirr'), (179, 'Narok North'), (180, 'Narok East'), (181, 'Narok South'), (182, 'Narok West'), (183, 'Kajiado North'), (184, 'Kajiado Central'), (185, 'Kajiado East'), (186, 'Kajiado West'), (187, 'Kajiado South'), (188, 'Kipkelion East'), (189, 'Kipkelion West'), (190, 'Ainamoi'), (191, 'Bureti'), (192, 'Belgut'), (193, 'Sigowet-Soin'), (194, 'Sotik'), (195, 'Chepalungu'), (196, 'Bomet East'), (197, 'Bomet Central'), (198, 'Konoin'), (199, 'Lugari'), (200, 'Likuyani'), (201, 'Malava'), (202, 'Lurambi'), (203, 'Navakholo'), (204, 'Mumias West'), (205, 'Mumias East'), (206, 'Matungu'), (207, 'Butere'), (208, 'Khwisero'), (209, 'Shinyalu'), (210, 'Ikolomani'), (211, 'Vihiga'), (212, 'Sabatia'), (213, 'Hamisi'), (214, 'Luanda'), (215, 'Emuhaya'), (216, 'Mount Elgon'), (217, 'Sirisia'), (218, 'Kabuchai'), (219, 'Bumula'), (220, 'Kanduyi'), (221, 'Webuye East'), (222, 'Webuye West'), (223, 'Kimilili'), (224, 'Tongaren'), (225, 'Teso North'), (226, 'Teso South'), (227, 'Nambale'), (228, 'Matayos'), (229, 'Butula'), (230, 'Funyula'), (231, 'Budalangi'), (232, 'Ugenya'), (233, 'Ugunja'), (234, 'Alego Usonga'), (235, 'Gem'), (236, 'Bondo'), (237, 'Rarieda'), (238, 'Kisumu East'), (239, 'Kisumu West'), (240, 'Kisumu Central'), (241, 'Seme'), (242, 'Nyando'), (243, 'Muhoroni'), (244, 'Nyakach'), (245, 'Kasipul'), (246, 'Kabondo Kasipul'), (247, 'Karachuonyo'), (248, 'Rangwe'), (249, 'Homa Bay Town'), (250, 'Ndhiwa'), (251, 'Mbita'), (252, 'Suba'), (253, 'Rongo'), (254, 'Awendo'), (255, 'Suna East'), (256, 'Suna West'), (257, 'Uriri'), (258, 'Nyatike'), (259, 'Kuria West'), (260, 'Kuria East'), (261, 'Bonchari'), (262, 'South Mugirango'), (263, 'Bomachoge Borabu'), (264, 'Bobasi'), (265, 'Bomachoge Chache'), (266, 'Nyaribari Masaba'), (267, 'Nyaribari Chache'), (268, 'Kitutu Chache North'), (269, 'Kitutu Chache South'), (270, 'Kitutu Masaba'), (271, 'West Mugirango'), (272, 'North Mugirango'), (273, 'Borabu'), (274, 'Westlands'), (275, 'Dagoretti'), (276, 'Dagoretti South'), (277, 'Langata'), (278, 'Kibra'), (279, 'Roysambu'), (280, 'Kasarani'), (281, 'Ruaraka'), (282, 'Embakasi South'), (283, 'Embakasi North'), (284, 'Embakasi Central'), (285, 'Embakasi East'), (286, 'Embakasi West'), (287, 'Makadara'), (288, 'Kamukunji'), (289, 'Starehe'), (290, 'Mathare')], null=True, verbose_name='Constituency')),
                ('senate', models.BooleanField(default=False, verbose_name='Senate')),
                ('county', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Baringo County'), (2, 'Bomet County'), (3, 'Bungoma County'), (4, 'Busia County'), (5, 'Diaspora'), (6, 'Elgeyo Marakwet County'), (7, 'Embu County'), (8, 'Garissa County'), (9, 'Homa Bay County'), (10, 'Isiolo County'), (11, 'Kajiado County'), (12, 'Kakamega County'), (13, 'Kericho County'), (14, 'Kiambu County'), (15, 'Kilifi County'), (16, 'Kirinyaga County'), (17, 'Kisii County'), (18, 'Kisumu County'), (19, 'Kitui County'), (20, 'Kwale County'), (21, 'Laikipia County'), (22, 'Lamu County'), (23, 'Machakos County'), (24, 'Makueni County'), (25, 'Mandera County'), (26, 'Meru County'), (27, 'Migori County'), (28, 'Marsabit County'), (29, 'Mombasa County'), (30, 'Muranga County'), (31, 'Nairobi County'), (32, 'Nakuru County'), (33, 'Nandi County'), (34, 'Narok County'), (35, 'Nyamira County'), (36, 'Nyandarua County'), (37, 'Nyeri County'), (38, 'Samburu County'), (39, 'Siaya County'), (40, 'Taita Taveta County'), (41, 'Tana River County'), (42, 'Tharaka Nithi County'), (43, 'Trans Nzoia County'), (44, 'Turkana County'), (45, 'Uasin Gishu County'), (46, 'Vihiga County'), (47, 'Wajir County'), (48, 'West Pokot County')], null=True, verbose_name='County')),
                ('nominated', models.BooleanField(default=False, verbose_name='Nominated')),
                ('joined', models.DateTimeField(db_index=True, default=datetime.datetime.now)),
                ('last_seen', models.DateTimeField(auto_now_add=True, null=True)),
                ('facebook', models.URLField(blank=True, null=True)),
                ('twitter', models.URLField(blank=True, null=True)),
                ('mobile', models.PositiveIntegerField(blank=True, help_text='Your local mobile number', null=True)),
                ('view_contacts', models.BooleanField(default=False, help_text='Set this to allow others to see your contacts.', verbose_name='Mobile contacts')),
                ('institution', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.Institution')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Profile',
                'verbose_name_plural': 'Profiles',
            },
        ),
    ]

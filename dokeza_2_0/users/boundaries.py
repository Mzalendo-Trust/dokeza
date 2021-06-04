# -*- coding: utf-8 -*-
"""
These are the boundaries that have been drawn to demacate Kenya.
"""

KENYAN_COUNTIES = (
    (1, 'Baringo County'), (2, 'Bomet County'), (3, 'Bungoma County'),
    (4, 'Busia County'), (5, 'Diaspora'), (6, 'Elgeyo Marakwet County'),
    (7, 'Embu County'), (8, 'Garissa County'), (9, 'Homa Bay County'),
    (10, 'Isiolo County'), (11, 'Kajiado County'), (12, 'Kakamega County'),
    (13, 'Kericho County'), (14, 'Kiambu County'), (15, 'Kilifi County'),
    (16, 'Kirinyaga County'), (17, 'Kisii County'), (18, 'Kisumu County'),
    (19, 'Kitui County'), (20, 'Kwale County'), (21, 'Laikipia County'),
    (22, 'Lamu County'), (23, 'Machakos County'), (24, 'Makueni County'),
    (25, 'Mandera County'), (26, 'Meru County'), (27, 'Migori County'),
    (28, 'Marsabit County'), (29, 'Mombasa County'), (30, 'Muranga County'),
    (31, 'Nairobi County'), (32, 'Nakuru County'), (33, 'Nandi County'),
    (34, 'Narok County'), (35, 'Nyamira County'), (36, 'Nyandarua County'),
    (37, 'Nyeri County'), (38, 'Samburu County'), (39, 'Siaya County'),
    (40, 'Taita Taveta County'), (41, 'Tana River County'), (42, 'Tharaka Nithi County'),
    (43, 'Trans Nzoia County'), (44, 'Turkana County'), (45, 'Uasin Gishu County'),
    (46, 'Vihiga County'), (47, 'Wajir County'), (48, 'West Pokot County'),
)

KENYAN_CONSTITUENCIES = (

    # Mombasa County: 6
    (1, 'Changamwe'), (2, 'Jomvu'), (3, 'Kisauni'), (4,
                                                     'Nyali'), (5, 'Likoni'), (6, 'Mvita'),
    # Kwale County: 4
    (7, 'Msambweni'), (8, 'Lunga Lunga'), (9, 'Matuga',), (10, 'Kinango'),
    # Kilifi County: 7
    (11, 'Kilifi North'), (12, 'Kilifi South'), (13, 'Kaloleni'),
    (14, 'Rabai'), (15, 'Ganze'), (16, 'Malindi'), (17, 'Magarini'),
    # Tana River: 3
    (18, 'Garsen'), (19, 'Galole'), (20, 'Bura'),
    #  Lamu County: 2
    (21, 'Lamu East'), (22, 'Lamu West'),
    # Taita-Taveta County: 4
    (23, 'Taveta'), (24, 'Wundanyi'), (25, 'Mwatate'), (26, 'Voi'),
    # Garissa County: 6
    (27, 'Garissa Township'), (28, 'Balambala'), (29, 'Lagdera'),
    (30, 'Dadaab'), (31, 'Fafi'), (32, 'Ijara'),
    # Wajir County: 6
    (33, 'Wajir North'), (34, 'Wajir East'), (35, 'Tarbaj'),
    (36, 'Wajir West'), (37, 'Eldas'), (38, 'Wajir South'),
    # Mandera County: 6
    (39, 'Mandera West'), (40, 'Banissa'), (41, 'Mandera North'),
    (42, 'Mandera South'), (43, 'Mandera East'), (44, 'Lafey'),
    # )Marsabit County: 4
    (45, 'Moyale'), (46, 'North Horr'), (47, 'Saku'), (48, 'Laisamis'),
    # Isiolo County: 2
    (49, 'Isiolo North'), (50, 'Isiolo South'),
    # Meru County: 9
    (51, 'Igembe South'), (52, 'Igembe Central'), (53, 'Igembe North'),
    (54, 'Tigania West'), (55, 'Tigania East'), (56, 'North Imenti'),
    (57, 'Buuri'), (58, 'Central Imenti'), (59, 'South Imenti'),
    # Tharaka-Nithi County: 3
    (60, 'Maara'), (61, "Chuka/'Igambang'ombe"), (62, 'Tharaka'),
    # Embu County: 4
    (63, 'Manyatta'), (64, 'Runyenjes'), (65, 'Mbeere South'),
    (66, 'Mbeere North'),
    # Kitui County: 8
    (67, 'Mwingi North'), (68, 'Mwingi West'), (69, 'Mwingi Central'),
    (70, 'Kitui West'), (71, 'Kitui Rural'), (72, 'Kitui Central'),
    (73, 'Kitui East'), (74, 'Kitui South'),
    # Machakos County: 8
    (75, 'Masinga'), (76, 'Yatta'), (77, 'Kangundo'), (78, 'Matungulu'),
    (79, 'Kathiani'), (80, 'Mavoko'), (81, 'Machakos Town'), (82, 'Mwala.'),
    # Makueni County: 6
    (83, 'Mbooni'), (84, 'Kilome'), (85, 'Kaiti'), (86, 'Makueni'),
    (87, 'Kibwezi West'), (88, 'Kibwezi East'),
    # Nyandarua County: 5
    (89, 'Kinangop'), (90, 'Kipipiri'), (91, 'Ol Kalou'), (92, 'Ol Jorok'),
    (93, 'Ndaragwa.'),
    # Nyeri County: 6
    (94, 'Tetu'), (95, 'Kieni'), (96, 'Mathira'), (97, 'Othaya'),
    (98, 'Mukurweini'), (99, 'Nyeri Town'),
    # Kirinyaga County: 4
    (100, 'Mwea'), (101, 'Gichugu'), (102, 'Ndia'),
    (103, 'Kirinyaga Central'),
    # Murang'a County[: 7
    (104, 'Kangema'), (105, 'Mathioya'), (106, 'Kiharu'), (107, 'Kigumo'),
    (108, 'Maragwa'), (109, 'Kandara'), (110, 'Gatanga.'),
    # Kiambu County: 12
    (111, 'Gatundu South'), (112, 'Gatundu North'), (113, 'Juja'),
    (114, 'Thika Town'), (115, 'Ruiru'), (116, 'Githunguri'), (117, 'Kiambu'),
    (118, 'Kiambaa'), (119, 'Kabete'), (120, 'Kikuyu'), (121, 'Limuru'),
    (122, 'Lari'),
    # Turkana County: 6.
    (123, 'Turkana North'), (124, 'Turkana West'), (125, 'Turkana Central'),
    (126, 'Loima'), (127, 'Turkana South'), (128, 'Turkana East'),
    # West Pokot County: 4.
    (129, 'Kapenguria'), (130, 'Sigor'), (131, 'Kacheliba'),
    (132, 'Pokot South'),
    # Samburu County: 3
    (133, 'Samburu West'), (134, 'Samburu North'), (135, 'Samburu East'),
    # Trans-Nzoia County: 5
    (136, 'Kwanza'), (137, 'Endebess'), (138, 'Saboti'), (139, 'Kiminini'),
    (140, 'Cherangany'),
    # Uasin Gishu County: 6
    (141, 'Soy'), (142, 'Turbo'), (143, 'Moiben'), (144, 'Ainabkoi'),
    (145, 'Kapseret'), (146, 'Kesses'),
    # Elgeyo-Marakwet County: 4
    (147, 'Marakwet East'), (148, 'Marakwet West'), (149, 'Keiyo North'),
    (150, 'Keiyo South'),
    # Nandi County: 6
    (151, 'Tinderet'), (152, 'Aldai'), (153, 'Nandi Hills'), (154, 'Chesumei'),
    (155, 'Emgwen'), (156, 'Mosop'),
    # Baringo County: 6
    (157, 'Tiaty'), (158, 'Baringo North'), (159, 'Baringo Central'),
    (160, 'Baringo South'), (161, 'Mogotio'), (162, 'Eldama Ravine'),
    # Laikipia County: 3
    (163, 'Laikipia West'), (164, 'Laikipia East'), (165, 'Laikipia North'),
    # Nakuru County: 11
    (166, 'Molo'), (167, 'Njoro'), (168, 'Naivasha'), (169, 'Gilgil'),
    (170, 'Kuresoi South'), (171, 'Kuresoi North'), (172, 'Subukia'),
    (173, 'Rongai'), (174, 'Bahati'), (175, 'Nakuru Town West'),
    (176, 'Nakuru Town East'),
    # Narok County: 6
    (177, 'Kilgoris'), (178, 'Emurua Dikirr'), (179, 'Narok North'),
    (180, 'Narok East'), (181, 'Narok South'), (182, 'Narok West'),
    # Kajiado County: 5
    (183, 'Kajiado North'), (184, 'Kajiado Central'), (185, 'Kajiado East'),
    (186, 'Kajiado West'), (187, 'Kajiado South'),
    # Kericho County[: 6
    (188, 'Kipkelion East'), (189, 'Kipkelion West'), (190, 'Ainamoi'),
    (191, 'Bureti'), (192, 'Belgut'), (193, 'Sigowet-Soin'),
    # Bomet County[edit]: 5
    (194, 'Sotik'), (195, 'Chepalungu'), (196, 'Bomet East'),
    (197, 'Bomet Central'), (198, 'Konoin'),
    # Kakamega County: 12
    (199, 'Lugari'), (200, 'Likuyani'), (201, 'Malava'), (202, 'Lurambi'),
    (203, 'Navakholo'), (204, 'Mumias West'), (205, 'Mumias East'),
    (206, 'Matungu'), (207, 'Butere'), (208, 'Khwisero'), (209, 'Shinyalu'),
    (210, 'Ikolomani'),
    # Vihiga County: 5
    (211, 'Vihiga'), (212, 'Sabatia'), (213, 'Hamisi'), (214, 'Luanda'),
    (215, 'Emuhaya'),
    # 'Bungoma'), County: 9
    (216, 'Mount Elgon'), (217, 'Sirisia'), (218, 'Kabuchai'), (219, 'Bumula'),
    (220, 'Kanduyi'), (221, 'Webuye East'), (222, 'Webuye West'),
    (223, 'Kimilili'), (224, 'Tongaren'),
    # Busia County: 7
    (225, 'Teso North'), (226, 'Teso South'), (227, 'Nambale'),
    (228, 'Matayos'), (229, 'Butula'), (230, 'Funyula'), (231, 'Budalangi'),
    # Siaya County: 6
    (232, 'Ugenya'), (233, 'Ugunja'), (234, 'Alego Usonga'), (235, 'Gem'),
    (236, 'Bondo'), (237, 'Rarieda'),
    # Kisumu County: 7
    (238, 'Kisumu East'), (239, 'Kisumu West'), (240, 'Kisumu Central'),
    (241, 'Seme'), (242, 'Nyando'), (243, 'Muhoroni'), (244, 'Nyakach'),
    # Homa Bay County: 8
    (245, 'Kasipul'), (246, 'Kabondo Kasipul'), (247, 'Karachuonyo'),
    (248, 'Rangwe'), (249, 'Homa Bay Town'), (250, 'Ndhiwa'), (251, 'Mbita',),
    (252, 'Suba'),
    # Migori County: 8
    (253, 'Rongo'), (254, 'Awendo'), (255, 'Suna East'), (256, 'Suna West'),
    (257, 'Uriri'), (258, 'Nyatike'), (259, 'Kuria West'), (260, 'Kuria East'),
    # Kisii County: 9
    (261, 'Bonchari'), (262, 'South Mugirango'), (263, 'Bomachoge Borabu'),
    (264, 'Bobasi'), (265, 'Bomachoge Chache'), (266, 'Nyaribari Masaba'),
    (267, 'Nyaribari Chache'), (268, 'Kitutu Chache North'),
    (269, 'Kitutu Chache South'),
    # Nyamira County: 4
    (270, 'Kitutu Masaba'), (271, 'West Mugirango'), (272, 'North Mugirango'),
    (273, 'Borabu'),
    # Nairobi County: 17
    (274, 'Westlands'), (275, 'Dagoretti'), (276, 'Dagoretti South'),
    (277, 'Langata'), (278, 'Kibra'), (279, 'Roysambu'), (280, 'Kasarani'),
    (281, 'Ruaraka'), (282, 'Embakasi South'), (283, 'Embakasi North'),
    (284, 'Embakasi Central'), (285, 'Embakasi East'), (286, 'Embakasi West'),
    (287, 'Makadara'), (288, 'Kamukunji'), (289, 'Starehe'), (290, 'Mathare')
)

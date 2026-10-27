#!/usr/bin/env python3
"""Builds the Myanmar site pages (Burmese first, English second) from one template.

Run from the repo root:  python3 mm/_build.py
Writes mm/index.html, mm/sobha-central.html, mm/en/index.html, mm/en/sobha-central.html.
To add a project later: add a card to PROJECTS and a page like sobha_central().
"""
import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = '/sobhacentral/assets/img/'
PIXEL_ID = '806806699194177'
VER = '20261027b'
# Kyat figures use the Central Bank of Myanmar reference rate (1 AED ≈ 571.8 MMK, Oct 2026).
# The informal market rate is roughly double, so every page says the MMK amount is approximate.
MMK_NOTE_MY = 'ကျပ်ငွေ ပမာဏများသည် ဗဟိုဘဏ် ရည်ညွှန်းနှုန်း (1 AED ≈ 572 ကျပ်) ဖြင့် ခန့်မှန်းချက်သာ ဖြစ်ပါသည်။'
MMK_NOTE_EN = 'MMK amounts are approximate, at the Central Bank reference rate (1 AED ≈ 572 MMK).'

T = {
    'my': {
        'html_lang': 'my',
        'nav': [('#projects', 'ပရောဂျက်များ'), ('#why', 'ဘာကြောင့် ဒူဘိုင်း'), ('#how', 'ဝယ်ယူပုံ အဆင့်များ'), ('#contact', 'ဆက်သွယ်ရန်')],
        'nav_project': [('#towers', 'မျှော်စင်များ'), ('#plan', 'ငွေပေးချေမှု'), ('#location', 'တည်နေရာ'), ('#faq', 'မေးလေ့ရှိသော မေးခွန်းများ'), ('#contact', 'ဆက်သွယ်ရန်')],
        'home_title': 'Espousal | ဒူဘိုင်း ဇိမ်ခံ အိမ်ရာ ပရောဂျက်များ',
        'home_desc': 'ဒူဘိုင်းရှိ ထိပ်တန်း developer များ၏ ဇိမ်ခံ အိမ်ရာ ပရောဂျက်များကို မြန်မာ ဝယ်ယူသူများအတွက် Espousal မှ မိတ်ဆက်ပေးပါသည်။',
        'hero_eyebrow': 'ဒူဘိုင်း · ဇိမ်ခံ အိမ်ရာများ',
        'hero_h1': 'ဒူဘိုင်းရှိ <span class="gold">သင့်နေအိမ်</span>',
        'hero_tag': 'မြန်မာ ဝယ်ယူသူများအတွက် ရွေးချယ်ထားသော ပရောဂျက်များ',
        'hero_sub': 'ဒူဘိုင်းရှိ ထိပ်တန်း developer များ၏ ပရောဂျက်များကို Espousal မှ မိတ်ဆက်ပေးပြီး ရွေးချယ်ခြင်းမှ သော့လက်ခံရယူခြင်းအထိ လမ်းညွှန်ပေးပါသည်။',
        'cta_projects': 'ပရောဂျက်များ ကြည့်ရန်',
        'cta_details': 'အသေးစိတ် တောင်းခံရန်',
        'proj_eyebrow': 'ပရောဂျက်များ',
        'proj_title': 'ရွေးချယ်ထားသော <span class="gold">ပရောဂျက်များ</span>',
        'proj_sub': 'ပရောဂျက်တစ်ခုကို ရွေးချယ်ပြီး အသေးစိတ်၊ စျေးနှုန်းနှင့် brochure များကို ကြည့်ရှုပါ။',
        'flag_new': 'ယခု ရောင်းချနေပြီ',
        'sc_meta': 'Sobha Realty · Sheikh Zayed Road, ဒူဘိုင်း',
        'sc_text': 'Sheikh Zayed Road ပေါ်ရှိ မျှော်စင် 6 ခု။ အိပ်ခန်း 1, 2 နှင့် 3 ခန်း နေအိမ်များ။ AED 1.78 သန်း (≈ ကျပ်သိန်း 10,180) မှ စတင်။',
        'view_project': 'ပရောဂျက် ကြည့်ရန်',
        'soon_title': 'နောက်ထပ် ပရောဂျက်များ မကြာမီ',
        'soon_text': 'အခြား ထိပ်တန်း developer များ၏ ပရောဂျက်များကို မကြာမီ ထည့်သွင်းပါမည်။ စာရင်းသွင်းထားပါက ဦးစွာ အသိပေးပါမည်။',
        'soon_btn': 'အသိပေးချက် ရယူရန်',
        'why_eyebrow': 'ဘာကြောင့် ဒူဘိုင်း',
        'why_title': 'ဒူဘိုင်းတွင် <span class="gold">အိမ်ပိုင်ဆိုင်ခြင်း</span>',
        'why': [
            ('နိုင်ငံခြားသားများ ပိုင်ဆိုင်ခွင့်', 'ဒူဘိုင်း၏ သတ်မှတ်ထားသော ဒေသများတွင် နိုင်ငံခြားသားများသည် freehold အိမ်ခြံမြေကို အပြည့်အဝ ပိုင်ဆိုင်နိုင်ပါသည်။'),
            ('လွယ်ကူသော ငွေပေးချေမှု', 'ဆောက်လုပ်ဆဲကာလအတွင်း အရစ်ကျ ပေးချေပြီး ကျန်ငွေကို အိမ်ပြီးစီးချိန်တွင် ပေးချေနိုင်သော အစီအစဉ်များ ရှိပါသည်။'),
            ('ကမ္ဘာနှင့် ချိတ်ဆက်မှု', 'ဒူဘိုင်းသည် အာရှ၊ ဥရောပနှင့် အာဖရိကကို ချိတ်ဆက်ပေးသော လေကြောင်း အချက်အချာ မြို့ ဖြစ်ပါသည်။'),
            ('ယုံကြည်ရသော developer များ', 'Sobha Realty ကဲ့သို့ ဒီဇိုင်း၊ အင်ဂျင်နီယာနှင့် ဆောက်လုပ်ရေးကို ကိုယ်တိုင် လုပ်ဆောင်သော developer များနှင့်သာ လုပ်ဆောင်ပါသည်။'),
        ],
        'how_eyebrow': 'ဝယ်ယူပုံ အဆင့်များ',
        'how_title': 'ရိုးရှင်းသော <span class="gold">အဆင့် 4 ဆင့်</span>',
        'how': [
            ('စုံစမ်းမေးမြန်းခြင်း', 'ဖောင်ကို ဖြည့်ပါ။ စျေးနှုန်းစာရင်း၊ အခန်းပုံစံများနှင့် brochure ကို အီးမေးလ်ဖြင့် ပို့ပေးပါမည်။'),
            ('အခန်း ရွေးချယ်ခြင်း', 'video call ဖြင့် သို့မဟုတ် ဒူဘိုင်းသို့ လာရောက်ကြည့်ရှု၍ သင်နှင့် ကိုက်ညီသော အခန်းကို ရွေးချယ်ပါ။'),
            ('ကြိုတင် စာရင်းသွင်းခြင်း', 'developer ၏ KYC (ကိုယ်ရေးအချက်အလက်နှင့် ငွေကြေးရင်းမြစ် စစ်ဆေးမှု) ပြီးနောက် booking ငွေကို ပေးချေပါ။'),
            ('ပေးချေခြင်းနှင့် လက်ခံရယူခြင်း', 'payment plan အတိုင်း အရစ်ကျ ပေးချေပြီး အဆောက်အအုံ ပြီးစီးချိန်တွင် သော့ကို လက်ခံရယူပါ။'),
        ],
        'contact_eyebrow': 'ဆက်သွယ်ရန်',
        'contact_title': 'အသေးစိတ် <span class="gold">တောင်းခံရန်</span>',
        'contact_sub': 'အမည်နှင့် အီးမေးလ်ကို ဖြည့်ပါ။ ကျွန်ုပ်တို့၏ အကြံပေးမှ အီးမေးလ်ဖြင့် မကြာမီ ပြန်လည် ဆက်သွယ်ပါမည်။',
        'f_name': 'အမည်', 'f_email': 'အီးမေးလ်', 'f_phone': 'ဖုန်းနံပါတ်', 'f_city': 'မြို့', 'f_optional': '(မဖြည့်လည်း ရပါသည်)',
        'f_project': 'စိတ်ဝင်စားသော ပရောဂျက်', 'f_other': 'မသေချာသေးပါ / အခြား',
        'f_submit': 'ပေးပို့ရန်',
        'privacy': 'သင့်အချက်အလက်များကို Espousal အရောင်းအဖွဲ့နှင့်သာ မျှဝေပါမည်။',
        'privacy_link': 'ကိုယ်ရေးအချက်အလက် မူဝါဒ (English)',
        'email_us': 'သို့မဟုတ် အီးမေးလ် ပို့ရန်',
        'footer_by': 'Espousal — Sobha Realty ၏ Authorised Channel Partner',
        'disclaimer': 'ဤဝက်ဘ်ဆိုက်ကို Espousal မှ လုပ်ဆောင်ပြီး developer များ၏ တရားဝင် ဝက်ဘ်ဆိုက် မဟုတ်ပါ။ ပုံများသည် ကွန်ပျူတာဖြင့် ဖန်တီးထားသော ပုံဖော်ချက်များ ဖြစ်ပါသည်။ စျေးနှုန်း၊ ငွေပေးချေမှု အစီအစဉ်၊ အရွယ်အစားနှင့် ပြီးစီးမည့်ရက်များသည် ခန့်မှန်းချက်သာ ဖြစ်ပြီး ကြိုတင် အသိပေးခြင်း မရှိဘဲ ပြောင်းလဲနိုင်ပါသည်။ ကျပ်ငွေ ပမာဏများသည် ဗဟိုဘဏ် ရည်ညွှန်းနှုန်း (1 AED ≈ 572 ကျပ်) ဖြင့် ခန့်မှန်း ပြောင်းလဲထားခြင်းသာ ဖြစ်ပြီး အမှန်တကယ် ငွေလဲနှုန်းနှင့် များစွာ ကွာခြားနိုင်ပါသည်။ ဝယ်ယူမှုတိုင်းသည် developer ၏ KYC/AML စစ်ဆေးမှုများနှင့် သက်ဆိုင်ပါသည်။',
        'js': {
            'invalid': 'အမည်နှင့် မှန်ကန်သော အီးမေးလ်ကို ဖြည့်ပေးပါ။',
            'sending': 'ပေးပို့နေသည်…',
            'ok': 'ကျေးဇူးတင်ပါသည်။ ကျွန်ုပ်တို့၏ အကြံပေးမှ အီးမေးလ်ဖြင့် မကြာမီ ဆက်သွယ်ပါမည်။',
            'okBrochure': 'ကျေးဇူးတင်ပါသည်။ brochure ကို ဒေါင်းလုဒ် လုပ်နေပါပြီ။',
            'fail': 'ယခု ပေးပို့၍ မရပါ။ ကျေးဇူးပြု၍ အီးမေးလ် ပို့ပေးပါ —',
            'contexts': {
                'general': {'title': 'အသေးစိတ် တောင်းခံရန်', 'sub': 'အမည်နှင့် အီးမေးလ်ကို ဖြည့်ပါ။ ကျွန်ုပ်တို့၏ အကြံပေးမှ မကြာမီ ဆက်သွယ်ပါမည်။', 'cta': 'ပေးပို့ရန်', 'subject': 'General Enquiry'},
                'price-list': {'title': 'စျေးနှုန်းစာရင်း ရယူရန်', 'sub': 'နောက်ဆုံး စျေးနှုန်းစာရင်း၊ အခန်းပုံစံများနှင့် ငွေပေးချေမှု အစီအစဉ်ကို အီးမေးလ်ဖြင့် ပို့ပေးပါမည်။', 'cta': 'စျေးနှုန်းစာရင်း ပို့ပေးပါ', 'subject': 'Price List Request'},
                'brochure': {'title': 'Brochure ဒေါင်းလုဒ်', 'sub': 'အချက်အလက် ဖြည့်ပြီး ပေးပို့သည်နှင့် brochure ကို ချက်ချင်း ဒေါင်းလုဒ် လုပ်ပါမည်။', 'cta': 'ပေးပို့ပြီး ဒေါင်းလုဒ်', 'subject': 'Brochure Download'},
                'notify': {'title': 'ပရောဂျက်အသစ် အသိပေးချက်', 'sub': 'ပရောဂျက်အသစ်များ ထွက်ရှိသည်နှင့် အီးမေးလ်ဖြင့် ဦးစွာ အသိပေးပါမည်။', 'cta': 'စာရင်းသွင်းရန်', 'subject': 'New Projects Alert'},
            },
        },
        # project page
        'sc_title': 'Sobha Central | Sheikh Zayed Road, ဒူဘိုင်း | Espousal',
        'sc_desc': 'Sobha Central — Sheikh Zayed Road ပေါ်ရှိ Sobha Realty ၏ မျှော်စင် 6 ခု။ AED 1.78 သန်းမှ စတင်။ 40% ဆောက်လုပ်ဆဲကာလ၊ 60% ပြီးစီးချိန်။',
        'back': '← ပရောဂျက်များ အားလုံး',
        'sc_eyebrow': 'Sobha Realty · Sheikh Zayed Road · ဒူဘိုင်း',
        'sc_tag': 'အားလုံး ချိတ်ဆက်ရာ နေရာ',
        'sc_sub': 'ဒူဘိုင်း၏ အထင်ကရ Sheikh Zayed Road ပေါ်တွင် အချင်းချင်း ချိတ်ဆက်ထားသော မျှော်စင် 6 ခု — မြင့်မားသော ပန်းခြံများ၊ ဈေးဝယ်စင်တာနှင့် ရုံးခန်းများကို နေရာတစ်ခုတည်းတွင် ရရှိနိုင်ပါသည်။',
        'from': 'စတင် စျေးနှုန်း', 'approx_usd': '≈ ကျပ်သိန်း 10,180',
        'plan_short': '40% ဆောက်လုပ်ဆဲ · 60% ပြီးစီးချိန်',
        'cta_price': 'စျေးနှုန်းစာရင်း ရယူရန်', 'cta_brochure': 'Brochure ဒေါင်းလုဒ်',
        'facts': [('6', 'မျှော်စင်'), ('G+94', 'အမြင့်ဆုံး မျှော်စင်'), ('175K', 'sq.ft. ရုံးခန်းနေရာ'), ('2029–30', 'ပြီးစီးမည့်နှစ်')],
        'towers_eyebrow': 'မျှော်စင်များ',
        'towers_title': 'မျှော်စင် 6 ခု။ <span class="gold">လိပ်စာ တစ်ခု။</span>',
        'towers_sub': 'မျှော်စင်တစ်ခုစီတွင် ကိုယ်ပိုင် ရှုခင်း၊ အခန်းအမျိုးအစားနှင့် ပြီးစီးမည့်ရက် ရှိပါသည်။',
        't_res': 'အခန်းအမျိုးအစား', 't_size': 'အရွယ်အစား', 't_hand': 'ပြီးစီးမည့်ရက်',
        'towers': [
            ('horizon', 'The Horizon', 'tower-horizon.jpg', 'ပထမဆုံး မျှော်စင်', 'အိပ်ခန်း 1 နှင့် 2', '568 – 1,554 sq.ft.', 'ဒီဇင်ဘာ 2029'),
            ('mirage', 'The Mirage', 'tower-mirage.jpg', 'ထောင့်စွန်းဆုံး မျှော်စင် · Marina ရှုခင်း', 'အိပ်ခန်း 1, 2 နှင့် 3', '648 – 1,862 sq.ft.', 'ဒီဇင်ဘာ 2030'),
            ('pinnacle', 'The Pinnacle', 'tower-pinnacle.jpg', 'အမြင့်ဆုံး လူနေ မျှော်စင်', 'အိပ်ခန်း 1 နှင့် 2', '565 – 1,086 sq.ft.', 'ဒီဇင်ဘာ 2030'),
            ('serene', 'The Serene', 'tower-serene.jpg', 'အိပ်ခန်း 3 ခန်း နေအိမ်များ', 'အိပ်ခန်း 3 (အိမ်ဖော်ခန်း ပါ)', '1,668 – 1,669 sq.ft.', 'ဒီဇင်ဘာ 2029'),
        ],
        'towers_req': [('The Tranquil', 'tower-tranquil.jpg'), ('The Eden', '../towers-night.jpg')],
        'req': 'အသေးစိတ်ကို တောင်းဆိုမှုဖြင့်', 'req_btn': 'အသေးစိတ် တောင်းခံရန်', 'brochure_btn': 'Brochure ဒေါင်းလုဒ်',
        'plan_eyebrow': 'ငွေပေးချေမှု အစီအစဉ်',
        'plan_title': 'လွယ်ကူသော <span class="gold">ငွေပေးချေမှု</span>',
        'plan_a': 'ဆောက်လုပ်ဆဲ ကာလအတွင်း', 'plan_b': 'ပြီးစီးချိန်တွင်',
        'plan_note': 'အိပ်ခန်း 1 ခန်း AED 1.78 သန်း (≈ ကျပ်သိန်း 10,180) မှ၊ အိပ်ခန်း 2 ခန်း AED 2.47 သန်း (≈ ကျပ်သိန်း 14,120) မှ စတင်ပါသည်။ စျေးနှုန်းများသည် မျှော်စင်၊ အထပ်နှင့် ရှုခင်းအလိုက် ကွာခြားပါသည်။ ' + MMK_NOTE_MY,
        'amen_eyebrow': 'အထောက်အကူပြု ပစ္စည်းများ',
        'amen_title': 'အိမ်အောက်တွင် <span class="gold">အားလုံးရှိသည်</span>',
        'amen': ['ရေကူးကန်များ', 'ကလေး ရေကူးကန်', 'ဘောလုံးကွင်း', 'ခရစ်ကတ် ကွင်း', 'အားကစားခန်း', 'ယောဂ စတူဒီယို', 'အပြင်ဘက် ရုပ်ရှင်ရုံ', 'မိသားစု BBQ နေရာ', 'ကလေး ကစားကွင်း', 'ပန်းခြံများ', 'ခွေး ပန်းခြံ', 'စာကြည့်တိုက်', 'ရေနွေးငွေ့နှင့် ဆောနာ', 'ဈေးဝယ်စင်တာ'],
        'loc_eyebrow': 'တည်နေရာ',
        'loc_title': 'အရာအားလုံးနှင့် <span class="gold">နီးကပ်သည်</span>',
        'loc_sub': 'Bluewaters နှင့် JLT လမ်းဆုံတွင် တည်ရှိပြီး Jebel Ali Metro ဘူတာသို့ လမ်းလျှောက် ရောက်နိုင်ပါသည်။ ကိုယ်ပိုင် တံတားနှင့် လမ်းကြောင်းများဖြင့် Sheikh Zayed Road သို့ တိုက်ရိုက် ချိတ်ဆက်ထားပါသည်။',
        'min': 'မိနစ်',
        'times': [('Dubai Marina နှင့် JLT', '5'), ('JBR နှင့် Ain Dubai', '10'), ('Palm Jumeirah', '12'), ('Mall of the Emirates', '15'), ('Al Maktoum နိုင်ငံတကာ လေဆိပ်', '25'), ('Downtown နှင့် Burj Khalifa', '25'), ('Dubai နိုင်ငံတကာ လေဆိပ် (DXB)', '28')],
        'times_note': 'ကားဖြင့် သွားရောက်ရန် ခန့်မှန်းကြာချိန်များ ဖြစ်ပါသည်။',
        'gal_eyebrow': 'ဓာတ်ပုံများ',
        'faq_eyebrow': 'မေးလေ့ရှိသော မေးခွန်းများ',
        'faq': [
            ('မြန်မာ နိုင်ငံသားများ ဝယ်ယူနိုင်ပါသလား။', 'ဒူဘိုင်း၏ သတ်မှတ်ထားသော ဒေသများတွင် နိုင်ငံခြားသားများ freehold အိမ်ခြံမြေ ဝယ်ယူနိုင်ပါသည်။ ဝယ်ယူမှုတိုင်းသည် developer ၏ ကိုယ်ရေးအချက်အလက်နှင့် ငွေကြေးရင်းမြစ် စစ်ဆေးမှု (KYC/AML) နှင့် သက်ဆိုင်ပါသည်။ သင့်အတွက် လိုအပ်ချက်များကို ကျွန်ုပ်တို့၏ အကြံပေးမှ အတည်ပြုပေးပါမည်။'),
            ('ဒူဘိုင်းသို့ ကိုယ်တိုင် လာရန် လိုအပ်ပါသလား။', 'အခန်းများကို video call ဖြင့် ကြည့်ရှုနိုင်ပါသည်။ booking နှင့် စာချုပ် လုပ်ထုံးလုပ်နည်းများကို developer ၏ လိုအပ်ချက်အတိုင်း ကျွန်ုပ်တို့၏ အကြံပေးမှ အသေးစိတ် ရှင်းပြပေးပါမည်။'),
            ('ငွေကို မည်သို့ ပေးချေရပါသလဲ။', 'ငွေပေးချေမှုများကို developer ၏ တရားဝင် ဘဏ်အကောင့်သို့ တိုက်ရိုက် ပေးချေရပါသည်။ နိုင်ငံခြားသို့ ငွေလွှဲပြောင်းခြင်းဆိုင်ရာ သင့်နိုင်ငံ၏ စည်းမျဉ်းများကို ကြိုတင် စစ်ဆေးပါ။'),
            ('အိမ်ကို မည်သည့်အချိန်တွင် လက်ခံရယူရမည်နည်း။', 'မျှော်စင်အလိုက် ကွာခြားပါသည် — The Horizon နှင့် The Serene သည် ဒီဇင်ဘာ 2029၊ The Mirage နှင့် The Pinnacle သည် ဒီဇင်ဘာ 2030 (ခန့်မှန်း ပြီးစီးမည့်ရက်) ဖြစ်ပါသည်။'),
        ],
        'switch': [('my', 'မြန်မာ'), ('en', 'English')],
    },
    'en': {
        'html_lang': 'en',
        'nav': [('#projects', 'Projects'), ('#why', 'Why Dubai'), ('#how', 'How to Buy'), ('#contact', 'Contact')],
        'nav_project': [('#towers', 'Towers'), ('#plan', 'Payment Plan'), ('#location', 'Location'), ('#faq', 'FAQ'), ('#contact', 'Contact')],
        'home_title': 'Espousal | Luxury Dubai Property for Myanmar Buyers',
        'home_desc': 'Espousal presents selected luxury residential projects by leading Dubai developers to buyers from Myanmar.',
        'hero_eyebrow': 'Dubai · Luxury Residences',
        'hero_h1': 'Your home <span class="gold">in Dubai</span>',
        'hero_tag': 'Selected projects for buyers from Myanmar',
        'hero_sub': 'Espousal presents projects by Dubai’s leading developers and guides you from choosing a home to receiving your keys.',
        'cta_projects': 'View Projects',
        'cta_details': 'Request Details',
        'proj_eyebrow': 'Projects',
        'proj_title': 'Selected <span class="gold">projects</span>',
        'proj_sub': 'Choose a project to see its details, prices and brochures.',
        'flag_new': 'Now selling',
        'sc_meta': 'Sobha Realty · Sheikh Zayed Road, Dubai',
        'sc_text': 'Six towers on Sheikh Zayed Road. One, two and three bedroom residences from AED 1.78M (≈ MMK 1,018 million).',
        'view_project': 'View Project',
        'soon_title': 'More projects coming soon',
        'soon_text': 'Projects by other leading developers will be added soon. Register and we will tell you first.',
        'soon_btn': 'Get Notified',
        'why_eyebrow': 'Why Dubai',
        'why_title': 'Owning a home <span class="gold">in Dubai</span>',
        'why': [
            ('Ownership for foreigners', 'Foreign nationals can fully own freehold property in Dubai’s designated areas.'),
            ('Easy payment plans', 'Pay in instalments during construction and the balance when the building is completed.'),
            ('Connected to the world', 'Dubai is an aviation hub linking Asia, Europe and Africa.'),
            ('Trusted developers', 'We work only with developers such as Sobha Realty, who design, engineer and build in-house.'),
        ],
        'how_eyebrow': 'How to Buy',
        'how_title': 'Four <span class="gold">simple steps</span>',
        'how': [
            ('Enquire', 'Fill in the form and we will email you the price list, floor plans and brochure.'),
            ('Choose your home', 'View homes on a video call or visit Dubai, and choose the one that suits you.'),
            ('Reserve', 'Pay the booking amount after the developer’s KYC (identity and source-of-funds checks).'),
            ('Pay and receive', 'Pay in instalments as per the payment plan and receive your keys on completion.'),
        ],
        'contact_eyebrow': 'Contact',
        'contact_title': 'Request <span class="gold">details</span>',
        'contact_sub': 'Share your name and email. Our advisor will reply by email shortly.',
        'f_name': 'Name', 'f_email': 'Email', 'f_phone': 'Phone', 'f_city': 'City', 'f_optional': '(optional)',
        'f_project': 'Project of interest', 'f_other': 'Not sure yet / Other',
        'f_submit': 'Submit',
        'privacy': 'Your details are shared only with the Espousal sales team.',
        'privacy_link': 'Privacy Policy',
        'email_us': 'Or email us at',
        'footer_by': 'Espousal — Authorised Channel Partner of Sobha Realty',
        'disclaimer': 'This website is operated by Espousal and is not the official website of any developer. Images are computer-generated renderings. Prices, payment plans, sizes and completion dates are indicative and may change without notice. MMK amounts are approximate conversions at the Central Bank reference rate (1 AED ≈ 572 MMK) and can differ significantly from the rate you actually receive. Every purchase is subject to the developer’s KYC/AML checks.',
        'js': {
            'invalid': 'Please enter your name and a valid email address.',
            'sending': 'Sending…',
            'ok': 'Thank you. Our advisor will email you shortly.',
            'okBrochure': 'Thank you. Your brochure is downloading.',
            'fail': 'We couldn’t send that just now. Please email us at',
            'contexts': {
                'general': {'title': 'Request Details', 'sub': 'Share your name and email and our advisor will be in touch shortly.', 'cta': 'Submit', 'subject': 'General Enquiry'},
                'price-list': {'title': 'Get the Price List', 'sub': 'We will email you the latest price list, floor plans and payment plan.', 'cta': 'Send Me the Price List', 'subject': 'Price List Request'},
                'brochure': {'title': 'Download Brochure', 'sub': 'Fill in your details — the download starts as soon as you submit.', 'cta': 'Submit & Download', 'subject': 'Brochure Download'},
                'notify': {'title': 'New Project Alerts', 'sub': 'We will email you first when new projects are added.', 'cta': 'Register', 'subject': 'New Projects Alert'},
            },
        },
        'sc_title': 'Sobha Central | Sheikh Zayed Road, Dubai | Espousal',
        'sc_desc': 'Sobha Central — six towers by Sobha Realty on Sheikh Zayed Road. From AED 1.78M. 40% during construction, 60% on completion.',
        'back': '← All projects',
        'sc_eyebrow': 'Sobha Realty · Sheikh Zayed Road · Dubai',
        'sc_tag': 'Where it all connects.',
        'sc_sub': 'Six interconnected towers on Dubai’s iconic Sheikh Zayed Road — with elevated parks, a retail mall and premium offices, all within one address.',
        'from': 'Starting from', 'approx_usd': '≈ MMK 1,018 million',
        'plan_short': '40% during construction · 60% on completion',
        'cta_price': 'Get the Price List', 'cta_brochure': 'Download Brochure',
        'facts': [('6', 'Towers'), ('G+94', 'Tallest tower'), ('175K', 'Sq.ft. of offices'), ('2029–30', 'Handover by tower')],
        'towers_eyebrow': 'Towers',
        'towers_title': 'Six towers. <span class="gold">One address.</span>',
        'towers_sub': 'Each tower has its own views, residence mix and handover date.',
        't_res': 'Residences', 't_size': 'Sizes', 't_hand': 'Handover',
        'towers': [
            ('horizon', 'The Horizon', 'tower-horizon.jpg', 'The first tower', '1 & 2 Bedroom', '568 – 1,554 sq.ft.', 'December 2029'),
            ('mirage', 'The Mirage', 'tower-mirage.jpg', 'The cornermost tower · Marina views', '1, 2 & 3 Bedroom', '648 – 1,862 sq.ft.', 'December 2030'),
            ('pinnacle', 'The Pinnacle', 'tower-pinnacle.jpg', 'The tallest residential tower', '1 & 2 Bedroom', '565 – 1,086 sq.ft.', 'December 2030'),
            ('serene', 'The Serene', 'tower-serene.jpg', 'Three bedroom residences', '3 Bedroom with maid’s room', '1,668 – 1,669 sq.ft.', 'December 2029'),
        ],
        'towers_req': [('The Tranquil', 'tower-tranquil.jpg'), ('The Eden', '../towers-night.jpg')],
        'req': 'Details on request', 'req_btn': 'Request Details', 'brochure_btn': 'Download Brochure',
        'plan_eyebrow': 'Payment Plan',
        'plan_title': 'An easy <span class="gold">payment plan</span>',
        'plan_a': 'During construction', 'plan_b': 'On completion',
        'plan_note': 'One bedroom from AED 1.78M (≈ MMK 1,018 million); two bedroom from AED 2.47M (≈ MMK 1,412 million). Prices vary by tower, floor and view. ' + MMK_NOTE_EN,
        'amen_eyebrow': 'Amenities',
        'amen_title': 'Everything, <span class="gold">just downstairs</span>',
        'amen': ['Lap & leisure pools', 'Children’s pool', 'Football ground', 'Cricket enclosure', 'Indoor gym', 'Yoga studio', 'Outdoor cinema', 'Family BBQ', 'Children’s play area', 'Gardens', 'Dog park', 'Library', 'Steam & sauna', 'Retail mall'],
        'loc_eyebrow': 'Location',
        'loc_title': 'Minutes from <span class="gold">everything</span>',
        'loc_sub': 'At the Bluewaters & JLT interchange, within walking distance of Jebel Ali Metro, with its own bridge and lanes onto Sheikh Zayed Road.',
        'min': 'min',
        'times': [('Dubai Marina & JLT', '5'), ('JBR & Ain Dubai', '10'), ('Palm Jumeirah', '12'), ('Mall of the Emirates', '15'), ('Al Maktoum Int’l Airport', '25'), ('Downtown & Burj Khalifa', '25'), ('Dubai Int’l Airport (DXB)', '28')],
        'times_note': 'Approximate drive times.',
        'gal_eyebrow': 'Gallery',
        'faq_eyebrow': 'FAQ',
        'faq': [
            ('Can citizens of Myanmar buy?', 'Foreign nationals can buy freehold property in Dubai’s designated areas. Every purchase is subject to the developer’s identity and source-of-funds checks (KYC/AML); our advisor will confirm the requirements for your case.'),
            ('Do I need to travel to Dubai?', 'You can view homes on a video call. Our advisor will explain the booking and contract steps as required by the developer.'),
            ('How do I pay?', 'Payments are made directly to the developer’s official bank account. Please check your country’s rules on sending money abroad before you book.'),
            ('When is handover?', 'It depends on the tower — The Horizon and The Serene: December 2029; The Mirage and The Pinnacle: December 2030 (anticipated completion).'),
        ],
        'switch': [('my', 'မြန်မာ'), ('en', 'English')],
    },
}

GALLERY = [('towers/tower-horizon.jpg', 'Sobha Central'), ('towers/g-living-1br.jpg', 'Living'), ('bedroom.jpg', 'Bedroom'),
           ('pool.jpg', 'Pool'), ('towers/g-park.jpg', 'Parks'), ('towers/g-lobby.jpg', 'Lobby')]


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def url(lang, page):
    base = '/mm/' if lang == 'my' else '/mm/en/'
    return base + ('' if page == 'home' else 'sobha-central.html')


def head(t, lang, page, title, desc):
    alt_my, alt_en = url('my', page), url('en', page)
    return f'''<!doctype html>
<html lang="{t['html_lang']}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="https://espousalsobha.com{url(lang, page)}">
  <link rel="alternate" hreflang="my" href="https://espousalsobha.com{alt_my}">
  <link rel="alternate" hreflang="en" href="https://espousalsobha.com{alt_en}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:image" content="https://espousalsobha.com{IMG}hero-aerial.jpg">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#0b0d1c">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500&family=Noto+Sans+Myanmar:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/mm/assets/mm.css?v={VER}">
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '{PIXEL_ID}');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id={PIXEL_ID}&ev=PageView&noscript=1"></noscript>
  <!-- End Meta Pixel Code -->
</head>
<body>
'''


def nav(t, lang, page):
    items = t['nav'] if page == 'home' else t['nav_project']
    links = ''.join(f'<a href="{h}">{esc(n)}</a>' for h, n in items)
    if page != 'home':
        links = f'<a href="{url(lang, "home")}">{esc(t["back"])}</a>' + links
    sw = ''.join(f'<a href="{url(code, page)}"{" class=\"is-on\"" if code == lang else ""} hreflang="{code}">{name}</a>' for code, name in t['switch'])
    return f'''<header class="nav">
  <a class="nav__brand" href="{url(lang, 'home')}" aria-label="Espousal"><img src="{IMG}espousal-lockup.png" alt="Espousal Construction" width="330" height="36"></a>
  <nav class="nav__links" id="navLinks">{links}</nav>
  <div class="lang" aria-label="Language">{sw}</div>
  <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
</header>
'''


def form(t, cls='', project_select=True, project='Sobha Central'):
    sel = ''
    if project_select:
        sel = f'''<label class="field full"><span>{t['f_project']}</span><select name="project"><option>Sobha Central</option><option value="Not sure / Other">{t['f_other']}</option></select></label>'''
    return f'''<form class="form {cls} js-enquiry" data-context="general" data-project="{project}" novalidate>
      <label class="field"><span>{t['f_name']}</span><input name="name" type="text" autocomplete="name" required></label>
      <label class="field"><span>{t['f_email']}</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="field"><span>{t['f_phone']} <em>{t['f_optional']}</em></span><input name="phone" type="tel" autocomplete="tel" placeholder="+95 …"></label>
      <label class="field"><span>{t['f_city']} <em>{t['f_optional']}</em></span><input name="city" type="text" autocomplete="address-level2"></label>
      {sel}
      <div class="full"><button class="btn btn--gold" type="submit">{t['f_submit']}</button></div>
      <p class="form-msg full" role="status" aria-live="polite"></p>
      <p class="privacy full">{t['privacy']} <a href="/sobhacentral/privacy.html">{t['privacy_link']}</a></p>
    </form>'''


def contact(t):
    return f'''<section class="section section--alt" id="contact">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['contact_eyebrow']}</p><h2 class="title">{t['contact_title']}</h2><p class="sub">{t['contact_sub']}</p></div>
    {form(t, 'form--2')}
    <p class="note">{t['email_us']} <a href="mailto:masroorshad@gmail.com" style="text-decoration:underline">masroorshad@gmail.com</a></p>
  </div>
</section>
'''


def tail(t):
    return f'''<footer class="footer">
  <div class="wrap">
    <img src="{IMG}espousal-logo.png" alt="Espousal Construction" width="220" height="182" loading="lazy">
    <p>{t['footer_by']}</p>
    <p>{t['disclaimer']}</p>
    <p>© <span id="yr">2026</span> Espousal · <a href="mailto:masroorshad@gmail.com">masroorshad@gmail.com</a></p>
  </div>
</footer>

<div class="modal" id="modal" aria-hidden="true">
  <div class="modal__bg" data-close></div>
  <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="modal__close" data-close aria-label="Close">×</button>
    <h3 id="modalTitle"></h3>
    <p class="sub" id="modalSub"></p>
    <form class="form js-enquiry" id="modalForm" data-context="general" data-project="Sobha Central" novalidate>
      <label class="field"><span>{t['f_name']}</span><input name="name" type="text" autocomplete="name" required></label>
      <label class="field"><span>{t['f_email']}</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="field"><span>{t['f_phone']} <em>{t['f_optional']}</em></span><input name="phone" type="tel" autocomplete="tel" placeholder="+95 …"></label>
      <button class="btn btn--gold btn--block" type="submit" id="modalSubmit">{t['f_submit']}</button>
      <p class="form-msg" role="status" aria-live="polite"></p>
      <p class="privacy">{t['privacy']} <a href="/sobhacentral/privacy.html">{t['privacy_link']}</a></p>
    </form>
  </div>
</div>

<script>window.MM_TEXT = {json.dumps(t['js'], ensure_ascii=False)};</script>
<script src="/mm/assets/mm.js?v={VER}"></script>
</body>
</html>
'''


def home(t, lang):
    why = ''.join(f'<div class="feature"><h3>{a}</h3><p>{b}</p></div>' for a, b in t['why'])
    how = ''.join(f'<div class="feature"><h3>{a}</h3><p>{b}</p></div>' for a, b in t['how'])
    return head(t, lang, 'home', t['home_title'], t['home_desc']) + nav(t, lang, 'home') + f'''
<section class="hero" id="top">
  <div class="hero__bg"><img src="{IMG}hero-aerial.jpg" alt=""></div>
  <div class="wrap hero__in">
    <p class="eyebrow">{t['hero_eyebrow']}</p>
    <h1>{t['hero_h1']}</h1>
    <p class="hero__tag">{t['hero_tag']}</p>
    <p class="sub">{t['hero_sub']}</p>
    <div class="hero__actions">
      <a class="btn btn--gold" href="#projects">{t['cta_projects']}</a>
      <button class="btn btn--line" data-enquire="general">{t['cta_details']}</button>
    </div>
  </div>
</section>

<section class="section" id="projects">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['proj_eyebrow']}</p><h2 class="title">{t['proj_title']}</h2><p class="sub">{t['proj_sub']}</p></div>
    <div class="grid grid--2">
      <article class="card">
        <a class="card__img" href="{url(lang, 'sc')}"><img src="{IMG}towers/tower-horizon.jpg" alt="Sobha Central" loading="lazy"><span class="card__flag">{t['flag_new']}</span></a>
        <div class="card__body">
          <p class="card__meta">{t['sc_meta']}</p>
          <h3>Sobha Central</h3>
          <p>{t['sc_text']}</p>
          <a class="btn btn--gold" href="{url(lang, 'sc')}">{t['view_project']}</a>
        </div>
      </article>
      <article class="card card--soon">
        <div class="card__body">
          <h3>{t['soon_title']}</h3>
          <p>{t['soon_text']}</p>
          <button class="btn btn--line" data-enquire="notify">{t['soon_btn']}</button>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section section--alt" id="why">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['why_eyebrow']}</p><h2 class="title">{t['why_title']}</h2></div>
    <div class="grid grid--4">{why}</div>
  </div>
</section>

<section class="section" id="how">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['how_eyebrow']}</p><h2 class="title">{t['how_title']}</h2></div>
    <div class="grid grid--4 steps">{how}</div>
  </div>
</section>
''' + contact(t) + tail(t)


def sobha_central(t, lang):
    facts = ''.join(f'<div><b>{a}</b><span>{b}</span></div>' for a, b in t['facts'])
    towers = ''
    for key, name, img, line, res, size, hand in t['towers']:
        towers += f'''<article class="card tower">
        <div class="card__img"><img src="{IMG}towers/{img}" alt="{name}" loading="lazy"></div>
        <div class="card__body">
          <p class="card__meta">{line}</p><h3>{name}</h3>
          <dl><div><dt>{t['t_res']}</dt><dd>{res}</dd></div><div><dt>{t['t_size']}</dt><dd>{size}</dd></div><div><dt>{t['t_hand']}</dt><dd>{hand}</dd></div></dl>
          <button class="btn btn--line" data-enquire="brochure" data-item="{name}" data-brochure="{key}">{t['brochure_btn']}</button>
        </div>
      </article>'''
    for name, img in t['towers_req']:
        towers += f'''<article class="card tower tower--req">
        <div class="card__img"><img src="{IMG}towers/{img}" alt="{name}" loading="lazy"></div>
        <div class="card__body"><p class="card__meta">{t['req']}</p><h3>{name}</h3>
          <button class="btn btn--line" data-enquire="general" data-item="{name}">{t['req_btn']}</button></div>
      </article>'''
    amen = ''.join(f'<span>{a}</span>' for a in t['amen'])
    times = ''.join(f'<li><span>{a}</span><b>{b} {t["min"]}</b></li>' for a, b in t['times'])
    gal = ''.join(f'<img src="{IMG}{src}" alt="{alt}" loading="lazy">' for src, alt in GALLERY)
    faq = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in t['faq'])
    return head(t, lang, 'sc', t['sc_title'], t['sc_desc']) + nav(t, lang, 'sc') + f'''
<section class="hero" id="top">
  <div class="hero__bg"><img src="{IMG}hero-aerial.jpg" alt=""></div>
  <div class="wrap hero__in">
    <p class="eyebrow">{t['sc_eyebrow']}</p>
    <h1>Sobha <span class="gold">Central</span></h1>
    <p class="hero__tag">{t['sc_tag']}</p>
    <p class="sub">{t['sc_sub']}</p>
    <div class="hero__price"><span>{t['from']}</span><b>AED 1.78M</b><span>{t['approx_usd']}</span><i></i><span>{t['plan_short']}</span></div>
    <div class="hero__actions">
      <button class="btn btn--gold" data-enquire="price-list" data-item="Sobha Central">{t['cta_price']}</button>
      <button class="btn btn--line" data-enquire="brochure" data-item="Sobha Central" data-brochure="sobha-central">{t['cta_brochure']}</button>
    </div>
  </div>
</section>

<div class="wrap"><div class="facts">{facts}</div></div>

<section class="section" id="towers">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['towers_eyebrow']}</p><h2 class="title">{t['towers_title']}</h2><p class="sub">{t['towers_sub']}</p></div>
    <div class="grid grid--3">{towers}</div>
  </div>
</section>

<section class="section section--alt" id="plan">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['plan_eyebrow']}</p><h2 class="title">{t['plan_title']}</h2></div>
    <div class="plan"><div><b>40%</b><span>{t['plan_a']}</span></div><div><b>60%</b><span>{t['plan_b']}</span></div></div>
    <p class="note">{t['plan_note']}</p>
    <div class="hero__actions"><button class="btn btn--gold" data-enquire="price-list" data-item="Sobha Central">{t['cta_price']}</button></div>
  </div>
</section>

<section class="section" id="amenities">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['amen_eyebrow']}</p><h2 class="title">{t['amen_title']}</h2></div>
    <div class="chips">{amen}</div>
  </div>
</section>

<section class="section section--alt" id="location">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['loc_eyebrow']}</p><h2 class="title">{t['loc_title']}</h2><p class="sub">{t['loc_sub']}</p></div>
    <ul class="times">{times}</ul>
    <p class="note">{t['times_note']}</p>
  </div>
</section>

<section class="section" id="gallery">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['gal_eyebrow']}</p></div>
    <div class="gal">{gal}</div>
  </div>
</section>

<section class="section section--alt" id="faq">
  <div class="wrap">
    <div class="head"><p class="eyebrow">{t['faq_eyebrow']}</p></div>
    <div class="faq">{faq}</div>
  </div>
</section>
''' + contact(t).replace('section section--alt" id="contact"', 'section" id="contact"') + tail(t)


def write(path, html):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(html)
    print('wrote', path, len(html))


if __name__ == '__main__':
    write('index.html', home(T['my'], 'my'))
    write('sobha-central.html', sobha_central(T['my'], 'my'))
    write('en/index.html', home(T['en'], 'en'))
    write('en/sobha-central.html', sobha_central(T['en'], 'en'))

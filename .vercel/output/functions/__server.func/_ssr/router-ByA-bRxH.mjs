import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, Q as notFound, Y as redirect, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as number, c as union, i as literal, n as boolean, o as object, r as discriminatedUnion, s as string, t as _enum } from "../_libs/zod.mjs";
import { d as loadFanVideoBytes, f as pinAllUnpinned, l as loadFanJpegBytes, n as FAN_ID_RE, s as getFanWork, t as FANS_REPO_URL, u as loadFanOgJpegBytes } from "./fan-works-BMoXMERl.mjs";
import { a as safeEqual, i as adminToken, n as ADMIN_PASS, r as ADMIN_USER, t as ADMIN_COOKIE } from "./admin-secrets.server-ClVT0lhz.mjs";
import { n as getSql } from "./db-Cq0aOiwy.mjs";
import { a as loadSvgFramesJson, d as EMOJI_FONT, f as EMOJI_GLYPHS, i as loadSvgFile, n as getSvgReel, o as loadSvgPosterBytes, t as SVG_ID_RE } from "./svg-reels-D4HEG8-k.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { join } from "node:path";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-OEcYh0iS.js
var data = {
	count: 484,
	plates: [
		{
			"slug": "starry-night",
			"id": "starry-night",
			"title": "The Starry Night",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/3840px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "girl-with-a-pearl-earring",
			"id": "girl-with-a-pearl-earring",
			"title": "Girl with a Pearl Earring",
			"artist": "Johannes Vermeer",
			"year": "c. 1665",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Girl_with_a_Pearl_Earring.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Girl_with_a_Pearl_Earring.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "great-wave",
			"id": "great-wave",
			"title": "The Great Wave off Kanagawa",
			"artist": "Katsushika Hokusai",
			"year": "c. 1831",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/3840px-The_Great_Wave_off_Kanagawa.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "among-sierra-nevada",
			"id": "among-sierra-nevada",
			"title": "Among the Sierra Nevada, California",
			"artist": "Albert Bierstadt",
			"year": 1868,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Albert_Bierstadt_-_Among_the_Sierra_Nevada%2C_California_-_Google_Art_Project.jpg/3840px-Albert_Bierstadt_-_Among_the_Sierra_Nevada%2C_California_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albert_Bierstadt_-_Among_the_Sierra_Nevada,_California_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "young-hare",
			"id": "young-hare",
			"title": "Young Hare",
			"artist": "Albrecht Dürer",
			"year": 1502,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg/1920px-Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "melencolia",
			"id": "melencolia",
			"title": "Melencolia I",
			"artist": "Albrecht Dürer",
			"year": 1514,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Albrecht_D%C3%BCrer_-_Melencolia_I_-_Google_Art_Project.jpg/1920px-Albrecht_D%C3%BCrer_-_Melencolia_I_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Melencolia_I_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "calling-matthew",
			"id": "calling-matthew",
			"title": "The Calling of Saint Matthew",
			"artist": "Caravaggio",
			"year": "c. 1599–1600",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/3840px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "wanderer",
			"id": "wanderer",
			"title": "Wanderer above the Sea of Fog",
			"artist": "Caspar David Friedrich",
			"year": "c. 1818",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "impression-sunrise",
			"id": "impression-sunrise",
			"title": "Impression, Sunrise",
			"artist": "Claude Monet",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "woman-with-parasol",
			"id": "woman-with-parasol",
			"title": "Woman with a Parasol",
			"artist": "Claude Monet",
			"year": 1875,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/3840px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "japanese-bridge",
			"id": "japanese-bridge",
			"title": "The Japanese Footbridge",
			"artist": "Claude Monet",
			"year": 1899,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_Monet_-_The_Japanese_Footbridge.jpg/3840px-Claude_Monet_-_The_Japanese_Footbridge.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Japanese_Footbridge.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "water-lilies",
			"id": "water-lilies",
			"title": "Water Lilies",
			"artist": "Claude Monet",
			"year": "c. 1915",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1920px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "las-meninas",
			"id": "las-meninas",
			"title": "Las Meninas",
			"artist": "Diego Velázquez",
			"year": 1656,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/3840px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "absinthe",
			"id": "absinthe",
			"title": "L'Absinthe",
			"artist": "Edgar Degas",
			"year": "1875–1876",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Edgar_Degas_-_In_a_Caf%C3%A9_-_Google_Art_Project.jpg/3840px-Edgar_Degas_-_In_a_Caf%C3%A9_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edgar_Degas_-_In_a_Caf%C3%A9_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-ballet-class",
			"id": "the-ballet-class",
			"title": "The Ballet Class",
			"artist": "Edgar Degas",
			"year": "c. 1871–1874",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/3840px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-scream",
			"id": "the-scream",
			"title": "The Scream",
			"artist": "Edvard Munch",
			"year": 1893,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg/3840px-Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_The_Scream_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "view-of-toledo",
			"id": "view-of-toledo",
			"title": "View of Toledo",
			"artist": "El Greco",
			"year": "c. 1596–1600",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/ca/El_Greco_-_View_of_Toledo_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_Greco_-_View_of_Toledo_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "liberty-leading",
			"id": "liberty-leading",
			"title": "Liberty Leading the People",
			"artist": "Eugène Delacroix",
			"year": 1830,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Eugène_Delacroix_-_La_liberté_guidant_le_peuple.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "third-of-may",
			"id": "third-of-may",
			"title": "The Third of May 1808",
			"artist": "Francisco Goya",
			"year": 1814,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_in_Google_Earth.jpg/3840px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_in_Google_Earth.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_in_Google_Earth.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "naked-maja",
			"id": "naked-maja",
			"title": "La maja desnuda",
			"artist": "Francisco Goya",
			"year": "c. 1797–1800",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Goya_Maja_naga2.jpg/3840px-Goya_Maja_naga2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Goya_Maja_naga2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "saturn-devouring",
			"id": "saturn-devouring",
			"title": "Saturn Devouring His Son",
			"artist": "Francisco Goya",
			"year": "c. 1819–1823",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "grande-jatte",
			"id": "grande-jatte",
			"title": "A Sunday Afternoon on the Island of La Grande Jatte",
			"artist": "Georges Seurat",
			"year": "1884–1886",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg/3840px-Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "vertumnus",
			"id": "vertumnus",
			"title": "Vertumnus",
			"artist": "Giuseppe Arcimboldo",
			"year": 1591,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Vertumnus_%C3%A5rstidernas_gud_m%C3%A5lad_av_Giuseppe_Arcimboldo_1591_-_Skoklosters_slott_-_91503.jpg/3840px-Vertumnus_%C3%A5rstidernas_gud_m%C3%A5lad_av_Giuseppe_Arcimboldo_1591_-_Skoklosters_slott_-_91503.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vertumnus_%C3%A5rstidernas_gud_m%C3%A5lad_av_Giuseppe_Arcimboldo_1591_-_Skoklosters_slott_-_91503.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "american-gothic",
			"id": "american-gothic",
			"title": "American Gothic",
			"artist": "Grant Wood",
			"year": 1930,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/3840px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-kiss",
			"id": "the-kiss",
			"title": "The Kiss",
			"artist": "Gustav Klimt",
			"year": "1907–1908",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/3840px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "paris-street-rainy",
			"id": "paris-street-rainy",
			"title": "Paris Street; Rainy Day",
			"artist": "Gustave Caillebotte",
			"year": 1877,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg/1920px-Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Caillebotte_-_Paris_Street;_Rainy_Day_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ambassadors",
			"id": "ambassadors",
			"title": "The Ambassadors",
			"artist": "Hans Holbein the Younger",
			"year": 1533,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg/3840px-Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-dream",
			"id": "the-dream",
			"title": "The Dream",
			"artist": "Henri Rousseau",
			"year": 1910,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Henri_Rousseau_-_Le_R%C3%AAve_-_Google_Art_Project.jpg/3840px-Henri_Rousseau_-_Le_R%C3%AAve_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_Le_Rêve_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "garden-earthly",
			"id": "garden-earthly",
			"title": "The Garden of Earthly Delights",
			"artist": "Hieronymus Bosch",
			"year": "c. 1490–1500",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg/3840px-The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Garden_of_Earthly_Delights_by_Bosch_High_Resolution.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fighting-temeraire",
			"id": "fighting-temeraire",
			"title": "The Fighting Temeraire",
			"artist": "J. M. W. Turner",
			"year": 1839,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Turner_-_The_Fighting_Temeraire.jpg/3840px-Turner_-_The_Fighting_Temeraire.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Turner_-_The_Fighting_Temeraire.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "rain-steam",
			"id": "rain-steam",
			"title": "Rain, Steam and Speed",
			"artist": "J. M. W. Turner",
			"year": 1844,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Rain_Steam_and_Speed_the_Great_Western_Railway.jpg/3840px-Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "oath-horatii",
			"id": "oath-horatii",
			"title": "Oath of the Horatii",
			"artist": "Jacques-Louis David",
			"year": 1784,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/3840px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "death-of-marat",
			"id": "death-of-marat",
			"title": "The Death of Marat",
			"artist": "Jacques-Louis David",
			"year": 1793,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Jacques-Louis_David_-_Marat_assassinated_-_Google_Art_Project.jpg/3840px-Jacques-Louis_David_-_Marat_assassinated_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Marat_assassinated_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "whistlers-mother",
			"id": "whistlers-mother",
			"title": "Arrangement in Grey and Black No.1",
			"artist": "James McNeill Whistler",
			"year": 1871,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Whistlers_Mother_high_res.jpg/3840px-Whistlers_Mother_high_res.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Whistlers_Mother_high_res.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "arnolfini",
			"id": "arnolfini",
			"title": "The Arnolfini Portrait",
			"artist": "Jan van Eyck",
			"year": 1434,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/3840px-Van_Eyck_-_Arnolfini_Portrait.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "grande-odalisque",
			"id": "grande-odalisque",
			"title": "La Grande Odalisque",
			"artist": "Jean-Auguste-Dominique Ingres",
			"year": 1814,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Jean_Auguste_Dominique_Ingres%2C_La_Grande_Odalisque%2C_1814.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean_Auguste_Dominique_Ingres%2C_La_Grande_Odalisque%2C_1814.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gleaners",
			"id": "gleaners",
			"title": "The Gleaners",
			"artist": "Jean-François Millet",
			"year": 1857,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg/3840px-Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "angelus",
			"id": "angelus",
			"title": "The Angelus",
			"artist": "Jean-François Millet",
			"year": "1857–1859",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg/3840px-Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-swing",
			"id": "the-swing",
			"title": "The Swing",
			"artist": "Jean-Honoré Fragonard",
			"year": "c. 1767",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Jean-Honor%C3%A9_Fragonard_-_The_Swing_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Honor%C3%A9_Fragonard_-_The_Swing_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-milkmaid",
			"id": "the-milkmaid",
			"title": "The Milkmaid",
			"artist": "Johannes Vermeer",
			"year": "c. 1657–1658",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "view-of-delft",
			"id": "view-of-delft",
			"title": "View of Delft",
			"artist": "Johannes Vermeer",
			"year": "c. 1660–1661",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Vermeer-view-of-delft.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vermeer-view-of-delft.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hay-wain",
			"id": "hay-wain",
			"title": "The Hay Wain",
			"artist": "John Constable",
			"year": 1821,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/John_Constable_-_The_Hay_Wain_%281821%29.jpg/3840px-John_Constable_-_The_Hay_Wain_%281821%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Constable_-_The_Hay_Wain_%281821%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ophelia",
			"id": "ophelia",
			"title": "Ophelia",
			"artist": "John Everett Millais",
			"year": "1851–1852",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/3840px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "lady-of-shalott",
			"id": "lady-of-shalott",
			"title": "The Lady of Shalott",
			"artist": "John William Waterhouse",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg/3840px-John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "red-fuji",
			"id": "red-fuji",
			"title": "Fine Wind, Clear Morning (Red Fuji)",
			"artist": "Katsushika Hokusai",
			"year": "c. 1830–1832",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Red_Fuji_southern_wind_clear_morning.jpg/3840px-Red_Fuji_southern_wind_clear_morning.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Red_Fuji_southern_wind_clear_morning.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "lady-ermine",
			"id": "lady-ermine",
			"title": "Lady with an Ermine",
			"artist": "Leonardo da Vinci",
			"year": "c. 1489–1491",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/3840px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "mona-lisa",
			"id": "mona-lisa",
			"title": "Mona Lisa",
			"artist": "Leonardo da Vinci",
			"year": "c. 1503–1506",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/3840px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "creation-of-adam",
			"id": "creation-of-adam",
			"title": "The Creation of Adam",
			"artist": "Michelangelo",
			"year": "c. 1512",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Creaci%C3%B3n_de_Ad%C3%A1n.jpg/3840px-Creaci%C3%B3n_de_Ad%C3%A1n.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "mont-sainte",
			"id": "mont-sainte",
			"title": "Mont Sainte-Victoire",
			"artist": "Paul Cézanne",
			"year": "c. 1904",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg/3840px-Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "luncheon-boating",
			"id": "luncheon-boating",
			"title": "Luncheon of the Boating Party",
			"artist": "Pierre-Auguste Renoir",
			"year": 1881,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg/3840px-Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "tower-of-babel",
			"id": "tower-of-babel",
			"title": "The Tower of Babel",
			"artist": "Pieter Bruegel the Elder",
			"year": 1563,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/3840px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hunters-snow",
			"id": "hunters-snow",
			"title": "The Hunters in the Snow",
			"artist": "Pieter Bruegel the Elder",
			"year": 1565,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg/3840px-Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "school-of-athens",
			"id": "school-of-athens",
			"title": "The School of Athens",
			"artist": "Raphael",
			"year": "1509–1511",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Raphael_School_of_Athens.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Raphael_School_of_Athens.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sistine-madonna",
			"id": "sistine-madonna",
			"title": "The Sistine Madonna",
			"artist": "Raphael",
			"year": "c. 1513–1514",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg/1920px-RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresde%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "anatomy-lesson",
			"id": "anatomy-lesson",
			"title": "The Anatomy Lesson of Dr. Nicolaes Tulp",
			"artist": "Rembrandt",
			"year": 1632,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/3840px-Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "night-watch",
			"id": "night-watch",
			"title": "The Night Watch",
			"artist": "Rembrandt",
			"year": 1642,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg/3840px-The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Nightwatch_by_Rembrandt.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-rembrandt",
			"id": "self-portrait-rembrandt",
			"title": "Self-Portrait with Two Circles",
			"artist": "Rembrandt",
			"year": "c. 1665–1669",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/3840px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "primavera",
			"id": "primavera",
			"title": "Primavera",
			"artist": "Sandro Botticelli",
			"year": "c. 1482",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg/3840px-Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "birth-of-venus",
			"id": "birth-of-venus",
			"title": "The Birth of Venus",
			"artist": "Sandro Botticelli",
			"year": "c. 1484–1486",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/3840px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-oxbow",
			"id": "the-oxbow",
			"title": "View from Mount Holyoke, Northampton, Massachusetts, after a Thunderstorm — The Oxbow",
			"artist": "Thomas Cole",
			"year": 1836,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Oxbow_(The_Connecticut_River_near_Northampton_1836).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "blue-boy",
			"id": "blue-boy",
			"title": "The Blue Boy",
			"artist": "Thomas Gainsborough",
			"year": "c. 1770",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/46/Thomas_Gainsborough_-_The_Blue_Boy_%28c._1770%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Thomas_Gainsborough_-_The_Blue_Boy_(c._1770).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "raft-medusa",
			"id": "raft-medusa",
			"title": "The Raft of the Medusa",
			"artist": "Théodore Géricault",
			"year": "1818–1819",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/3840px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "venus-of-urbino",
			"id": "venus-of-urbino",
			"title": "Venus of Urbino",
			"artist": "Titian",
			"year": 1538,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "potato-eaters",
			"id": "potato-eaters",
			"title": "The Potato Eaters",
			"artist": "Vincent van Gogh",
			"year": 1885,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project.jpg/3840px-Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "cafe-terrace",
			"id": "cafe-terrace",
			"title": "Café Terrace at Night",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Vincent_van_Gogh_-_Cafe_Terrace_at_Night_%281888%29.jpg/3840px-Vincent_van_Gogh_-_Cafe_Terrace_at_Night_%281888%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Cafe_Terrace_at_Night_%281888%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "starry-night-rhone",
			"id": "starry-night-rhone",
			"title": "Starry Night Over the Rhône",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/3840px-Starry_Night_Over_the_Rhone.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Starry_Night_Over_the_Rhone.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sunflowers",
			"id": "sunflowers",
			"title": "Sunflowers",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "irises",
			"id": "irises",
			"title": "Irises",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/3840px-Irises-Vincent_van_Gogh.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Irises-Vincent_van_Gogh.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-1889",
			"id": "self-portrait-1889",
			"title": "Self-Portrait",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "almond-blossom",
			"id": "almond-blossom",
			"title": "Almond Blossom",
			"artist": "Vincent van Gogh",
			"year": 1890,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "wheatfield-crows",
			"id": "wheatfield-crows",
			"title": "Wheatfield with Crows",
			"artist": "Vincent van Gogh",
			"year": 1890,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "birth-venus-bouguereau",
			"id": "birth-venus-bouguereau",
			"title": "The Birth of Venus",
			"artist": "William-Adolphe Bouguereau",
			"year": 1879,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/William-Adolphe_Bouguereau_%281825-1905%29_-_The_Birth_of_Venus_%281879%29.jpg/3840px-William-Adolphe_Bouguereau_%281825-1905%29_-_The_Birth_of_Venus_%281879%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William-Adolphe_Bouguereau_%281825-1905%29_-_The_Birth_of_Venus_%281879%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gulf-stream",
			"id": "gulf-stream",
			"title": "The Gulf Stream",
			"artist": "Winslow Homer",
			"year": 1899,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg/3840px-Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "olympia",
			"id": "olympia",
			"title": "Olympia",
			"artist": "Édouard Manet",
			"year": 1863,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Edouard_Manet_-_Olympia_-_Google_Art_Project.jpg/3840px-Edouard_Manet_-_Olympia_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_-_Olympia_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bar-at-folies-bergere",
			"id": "bar-at-folies-bergere",
			"title": "A Bar at the Folies-Bergère",
			"artist": "Édouard Manet",
			"year": 1882,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Edouard_Manet%2C_A_Bar_at_the_Folies-Berg%C3%A8re.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edouard_Manet,_A_Bar_at_the_Folies-Bergère.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bedroom-in-arles",
			"id": "bedroom-in-arles",
			"title": "Bedroom in Arles",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/3840px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "haystacks-end-summer",
			"id": "haystacks-end-summer",
			"title": "Haystacks, End of Summer",
			"artist": "Claude Monet",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Claude_Monet_-_Haystacks%2C_end_of_Summer_-_Google_Art_Project.jpg/3840px-Claude_Monet_-_Haystacks%2C_end_of_Summer_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Haystacks,_end_of_Summer_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "rouen-cathedral",
			"id": "rouen-cathedral",
			"title": "Rouen Cathedral, West Façade, Sunlight",
			"artist": "Claude Monet",
			"year": 1894,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Claude_Monet_-_Rouen_Cathedral%2C_West_Fa%C3%A7ade%2C_Sunlight_-_Google_Art_Project.jpg/3840px-Claude_Monet_-_Rouen_Cathedral%2C_West_Fa%C3%A7ade%2C_Sunlight_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_West_Façade,_Sunlight_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "two-sisters",
			"id": "two-sisters",
			"title": "Two Sisters (On the Terrace)",
			"artist": "Pierre-Auguste Renoir",
			"year": 1881,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/77/Pierre-Auguste_Renoir_-_Two_Sisters_%28On_the_Terrace%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pierre-Auguste_Renoir_-_Two_Sisters_(On_the_Terrace)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "music-tuileries",
			"id": "music-tuileries",
			"title": "Music in the Tuileries",
			"artist": "Édouard Manet",
			"year": 1862,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/MANET_-_M%C3%BAsica_en_las_Tuller%C3%ADas_%28National_Gallery%2C_Londres%2C_1862%29.jpg/3840px-MANET_-_M%C3%BAsica_en_las_Tuller%C3%ADas_%28National_Gallery%2C_Londres%2C_1862%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:MANET_-_Música_en_las_Tullerías_(National_Gallery,_Londres,_1862).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "still-life-apples",
			"id": "still-life-apples",
			"title": "Still Life with Apples",
			"artist": "Paul Cézanne",
			"year": "c. 1895–1898",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Paul_C%C3%A9zanne_-_Still_Life_with_Apples_-_Google_Art_Project.jpg/3840px-Paul_C%C3%A9zanne_-_Still_Life_with_Apples_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Cézanne_-_Still_Life_with_Apples_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-bathers-cezanne",
			"id": "the-bathers-cezanne",
			"title": "The Large Bathers",
			"artist": "Paul Cézanne",
			"year": "c. 1900–1906",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Paul_C%C3%A9zanne%2C_French_-_The_Large_Bathers_-_Google_Art_Project.jpg/3840px-Paul_C%C3%A9zanne%2C_French_-_The_Large_Bathers_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Cézanne,_French_-_The_Large_Bathers_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-fifer",
			"id": "the-fifer",
			"title": "The Fifer",
			"artist": "Édouard Manet",
			"year": 1866,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Manet%2C_Edouard_-_Young_Flautist%2C_or_The_Fifer%2C_1866_%282%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Manet,_Edouard_-_Young_Flautist,_or_The_Fifer,_1866_(2).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "jewish-bride",
			"id": "jewish-bride",
			"title": "The Jewish Bride",
			"artist": "Rembrandt",
			"year": "c. 1667",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Rembrandt_Harmensz._van_Rijn_-_Portret_van_een_paar_als_oudtestamentische_figuren%2C_genaamd_%27Het_Joodse_bruidje%27_-_Google_Art_Project.jpg/3840px-Rembrandt_Harmensz._van_Rijn_-_Portret_van_een_paar_als_oudtestamentische_figuren%2C_genaamd_%27Het_Joodse_bruidje%27_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_Portret_van_een_paar_als_Oud-Testamentische_figuren,_genaamd_'Het_Joodse_bruidje'_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-geographer",
			"id": "the-geographer",
			"title": "The Geographer",
			"artist": "Johannes Vermeer",
			"year": "c. 1669",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Geographer_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "woman-holding-balance",
			"id": "woman-holding-balance",
			"title": "Woman Holding a Balance",
			"artist": "Johannes Vermeer",
			"year": "c. 1664",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "botticelli-annunciation",
			"id": "botticelli-annunciation",
			"title": "The Annunciation",
			"artist": "Sandro Botticelli",
			"year": "c. 1489",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Sandro_Botticelli_-_Annunciazione_di_Cestello.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_Annunciazione_di_Cestello.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "last-supper",
			"id": "last-supper",
			"title": "The Last Supper",
			"artist": "Leonardo da Vinci",
			"year": "c. 1495–1498",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg/3840px-Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_(1452-1519)_-_The_Last_Supper_(1495-1498).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sacred-profane-love",
			"id": "sacred-profane-love",
			"title": "Sacred and Profane Love",
			"artist": "Titian",
			"year": 1514,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Tiziano_-_Amor_Sacro_y_Amor_Profano_%28Galer%C3%ADa_Borghese%2C_Roma%2C_1514%29.jpg/3840px-Tiziano_-_Amor_Sacro_y_Amor_Profano_%28Galer%C3%ADa_Borghese%2C_Roma%2C_1514%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tiziano_-_Amor_Sacro_y_Amor_Profano_(Galería_Borghese,_Roma,_1514).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "clothed-maja",
			"id": "clothed-maja",
			"title": "The Clothed Maja",
			"artist": "Francisco Goya",
			"year": "c. 1800–1805",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Goya_Maja_ubrana2.jpg/3840px-Goya_Maja_ubrana2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Goya_Maja_ubrana2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "snow-storm-turner",
			"id": "snow-storm-turner",
			"title": "Snow Storm: Steam-Boat off a Harbour's Mouth",
			"artist": "J. M. W. Turner",
			"year": 1842,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/30/Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour%27s_Mouth_-_WGA23178.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour's_Mouth_-_WGA23178.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "burning-houses-lords",
			"id": "burning-houses-lords",
			"title": "The Burning of the Houses of Lords and Commons",
			"artist": "J. M. W. Turner",
			"year": 1835,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons%2C_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg/3840px-Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons%2C_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "salisbury-cathedral",
			"id": "salisbury-cathedral",
			"title": "Salisbury Cathedral from the Meadows",
			"artist": "John Constable",
			"year": 1831,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/John_Constable_-_Salisbury_Cathedral_from_the_Meadows_-_Google_Art_Project.jpg/3840px-John_Constable_-_Salisbury_Cathedral_from_the_Meadows_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Constable_-_Salisbury_Cathedral_from_the_Meadows_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "abbey-oakwood",
			"id": "abbey-oakwood",
			"title": "The Abbey in the Oakwood",
			"artist": "Caspar David Friedrich",
			"year": 1810,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg/3840px-Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "death-of-sardanapalus",
			"id": "death-of-sardanapalus",
			"title": "The Death of Sardanapalus",
			"artist": "Eugène Delacroix",
			"year": 1827,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Death_of_Sardanapalus_by_Eug%C3%A8ne_Delacroix.jpg/3840px-Death_of_Sardanapalus_by_Eug%C3%A8ne_Delacroix.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Death_of_Sardanapalus_by_Eugène_Delacroix.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "charging-chasseur",
			"id": "charging-chasseur",
			"title": "The Charging Chasseur",
			"artist": "Théodore Géricault",
			"year": 1812,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/GericaultHorseman.jpg/3840px-GericaultHorseman.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:GericaultHorseman.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "burial-at-ornans",
			"id": "burial-at-ornans",
			"title": "A Burial at Ornans",
			"artist": "Gustave Courbet",
			"year": 1850,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg/3840px-Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bathers-asnieres",
			"id": "bathers-asnieres",
			"title": "Bathers at Asnières",
			"artist": "Georges Seurat",
			"year": 1884,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Georges_Seurat_006.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat_006.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "surprised-tiger",
			"id": "surprised-tiger",
			"title": "Tiger in a Tropical Storm (Surprised!)",
			"artist": "Henri Rousseau",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Surprised-Rousseau.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Surprised-Rousseau.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sleeping-gypsy",
			"id": "sleeping-gypsy",
			"title": "The Sleeping Gypsy",
			"artist": "Henri Rousseau",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Henri_Rousseau_-_La_Boh%C3%A9mienne_endormie_-_Google_Art_Project.jpg/3840px-Henri_Rousseau_-_La_Boh%C3%A9mienne_endormie_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_La_Bohémienne_endormie_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "breezing-up",
			"id": "breezing-up",
			"title": "Breezing Up (A Fair Wind)",
			"artist": "Winslow Homer",
			"year": 1876,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Winslow_Homer_-_Breezing_Up_%28A_Fair_Wind%29_-_Google_Art_Project.jpg/3840px-Winslow_Homer_-_Breezing_Up_%28A_Fair_Wind%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_Breezing_Up_(A_Fair_Wind)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "rocky-mountains-lander",
			"id": "rocky-mountains-lander",
			"title": "The Rocky Mountains, Lander's Peak",
			"artist": "Albert Bierstadt",
			"year": 1863,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/45/Albert_Bierstadt_-_The_Rocky_Mountains%2C_Lander%27s_Peak.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albert_Bierstadt_-_The_Rocky_Mountains,_Lander's_Peak.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "heart-of-the-andes",
			"id": "heart-of-the-andes",
			"title": "The Heart of the Andes",
			"artist": "Frederic Edwin Church",
			"year": 1859,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Church_Heart_of_the_Andes.jpg/3840px-Church_Heart_of_the_Andes.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Church_Heart_of_the_Andes.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "course-of-empire-consummation",
			"id": "course-of-empire-consummation",
			"title": "The Course of Empire: Consummation",
			"artist": "Thomas Cole",
			"year": 1836,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg/3840px-Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sudden-shower-shinohashi",
			"id": "sudden-shower-shinohashi",
			"title": "Sudden Shower over Shin-Ōhashi Bridge and Atake",
			"artist": "Utagawa Hiroshige",
			"year": 1857,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg/3840px-Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hiroshige,_Sudden_shower_over_Shin-Ōhashi_bridge_and_Atake,_1857.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "plum-estate",
			"id": "plum-estate",
			"title": "Plum Estate, Kameido",
			"artist": "Utagawa Hiroshige",
			"year": 1857,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/19/Ando_Hiroshige_-_Plum_Garden%2C_Kameido_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ando_Hiroshige_-_Plum_Garden,_Kameido_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "three-beauties",
			"id": "three-beauties",
			"title": "Three Beauties of the Present Day",
			"artist": "Kitagawa Utamaro",
			"year": "c. 1793",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Kitagawa_Utamaro_-_Toji_san_bijin_%28Three_Beauties_of_the_Present_Day%29From_Bijin-ga_%28Pictures_of_Beautiful_Women%29%2C_published_by_Tsutaya_Juzaburo_-_Google_Art_Project.jpg/3840px-thumbnail.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Kitagawa_Utamaro_-_Toji_san_bijin_(Three_Beauties_of_the_Present_Day)From_Bijin-ga_(Pictures_of_Beautiful_Women),_published_by_Tsutaya_Juzaburo_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "peasant-wedding",
			"id": "peasant-wedding",
			"title": "The Peasant Wedding",
			"artist": "Pieter Bruegel the Elder",
			"year": 1567,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Pieter_Bruegel_the_Elder_-_Peasant_Wedding_-_Google_Art_Project.jpg/3840px-Pieter_Bruegel_the_Elder_-_Peasant_Wedding_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Peasant_Wedding_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "netherlandish-proverbs",
			"id": "netherlandish-proverbs",
			"title": "Netherlandish Proverbs",
			"artist": "Pieter Bruegel the Elder",
			"year": 1559,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Pieter_Brueghel_the_Elder_-_The_Dutch_Proverbs_-_Google_Art_Project.jpg/3840px-Pieter_Brueghel_the_Elder_-_The_Dutch_Proverbs_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Dutch_Proverbs_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "haywain-bosch",
			"id": "haywain-bosch",
			"title": "The Haywain Triptych",
			"artist": "Hieronymus Bosch",
			"year": "c. 1516",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/74/Hieronymus_Bosch_070.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hieronymus_Bosch_070.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "innocent-x",
			"id": "innocent-x",
			"title": "Portrait of Innocent X",
			"artist": "Diego Velázquez",
			"year": "c. 1650",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Portrait_of_Innocentius_X_by_Diego_Vel%C3%A1zquez_in_Galleria_Doria_Pamphilj_%28Rome%29.jpg/3840px-Portrait_of_Innocentius_X_by_Diego_Vel%C3%A1zquez_in_Galleria_Doria_Pamphilj_%28Rome%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Portrait_of_Innocentius_X_by_Diego_Velázquez_in_Galleria_Doria_Pamphilj_(Rome).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "young-girl-reading",
			"id": "young-girl-reading",
			"title": "Young Girl Reading",
			"artist": "Jean-Honoré Fragonard",
			"year": "c. 1770",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/69/Fragonard%2C_The_Reader.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fragonard,_The_Reader.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "embarkation-cythera",
			"id": "embarkation-cythera",
			"title": "Embarkation for Cythera",
			"artist": "Jean-Antoine Watteau",
			"year": 1717,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/L%27Embarquement_pour_Cyth%C3%A8re%2C_by_Antoine_Watteau%2C_from_C2RMF_retouched.jpg/3840px-L%27Embarquement_pour_Cyth%C3%A8re%2C_by_Antoine_Watteau%2C_from_C2RMF_retouched.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:L'Embarquement_pour_Cythère,_by_Antoine_Watteau,_from_C2RMF_retouched.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hylas-and-nymphs",
			"id": "hylas-and-nymphs",
			"title": "Hylas and the Nymphs",
			"artist": "John William Waterhouse",
			"year": 1896,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Waterhouse_Hylas_and_the_Nymphs_Manchester_Art_Gallery_1896.15.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Waterhouse_Hylas_and_the_Nymphs_Manchester_Art_Gallery_1896.15.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "reading-from-homer",
			"id": "reading-from-homer",
			"title": "A Reading from Homer",
			"artist": "Lawrence Alma-Tadema",
			"year": 1885,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Sir_Lawrence_Alma-Tadema%2C_English_%28born_Netherlands%29_-_A_Reading_from_Homer_-_Google_Art_Project.jpg/3840px-Sir_Lawrence_Alma-Tadema%2C_English_%28born_Netherlands%29_-_A_Reading_from_Homer_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Sir_Lawrence_Alma-Tadema,_English_(born_Netherlands)_-_A_Reading_from_Homer_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "childs-bath",
			"id": "childs-bath",
			"title": "The Child's Bath",
			"artist": "Mary Cassatt",
			"year": 1893,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/72/Mary_Cassatt_-_The_Child%27s_Bath_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mary_Cassatt_-_The_Child's_Bath_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "carnation-lily",
			"id": "carnation-lily",
			"title": "Carnation, Lily, Lily, Rose",
			"artist": "John Singer Sargent",
			"year": 1885,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ed/John_Singer_Sargent_-_Carnation%2C_Lily%2C_Lily%2C_Rose_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Singer_Sargent_-_Carnation,_Lily,_Lily,_Rose_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "symphony-in-white",
			"id": "symphony-in-white",
			"title": "Symphony in White, No. 1: The White Girl",
			"artist": "James McNeill Whistler",
			"year": 1862,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Whistler_James_Symphony_in_White_no_1_%28The_White_Girl%29_1862.jpg/3840px-Whistler_James_Symphony_in_White_no_1_%28The_White_Girl%29_1862.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Whistler_James_Symphony_in_White_no_1_(The_White_Girl)_1862.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "delphic-sibyl",
			"id": "delphic-sibyl",
			"title": "The Delphic Sibyl",
			"artist": "Michelangelo",
			"year": "c. 1509",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Delphic_Sibyl.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Delphic_Sibyl.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "burial-count-orgaz",
			"id": "burial-count-orgaz",
			"title": "The Burial of the Count of Orgaz",
			"artist": "El Greco",
			"year": 1586,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/ff/El_Greco_-_The_Burial_of_the_Count_of_Orgaz.JPG",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_Greco_-_The_Burial_of_the_Count_of_Orgaz.JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portrait-henry-viii",
			"id": "portrait-henry-viii",
			"title": "Portrait of Henry VIII",
			"artist": "Hans Holbein the Younger",
			"year": "c. 1537",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/After_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:After_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "card-players",
			"id": "card-players",
			"title": "The Card Players",
			"artist": "Paul Cézanne",
			"year": "c. 1894–1895",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg/3840px-Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Les_Joueurs_de_cartes,_par_Paul_Cézanne.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "poppies",
			"id": "poppies",
			"title": "Poppies",
			"artist": "Claude Monet",
			"year": 1873,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Claude_Monet_-_Poppy_Field_-_Google_Art_Project.jpg/3840px-Claude_Monet_-_Poppy_Field_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Poppy_Field_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "letoile",
			"id": "letoile",
			"title": "L'Étoile",
			"artist": "Edgar Degas",
			"year": 1878,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Edgar_Degas_-_The_Star_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edgar_Degas_-_The_Star_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-astronomer",
			"id": "the-astronomer",
			"title": "The Astronomer",
			"artist": "Johannes Vermeer",
			"year": "c. 1668",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Johannes_Vermeer_-_The_Astronomer_-_1668.jpg/3840px-Johannes_Vermeer_-_The_Astronomer_-_1668.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Astronomer_-_1668.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "laughing-cavalier",
			"id": "laughing-cavalier",
			"title": "The Laughing Cavalier",
			"artist": "Frans Hals",
			"year": 1624,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Frans_Hals_%E2%80%93_The_Laughing_Cavalier.jpg/3840px-Frans_Hals_%E2%80%93_The_Laughing_Cavalier.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frans_Hals_%E2%80%93_The_Laughing_Cavalier.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-goldfinch",
			"id": "the-goldfinch",
			"title": "The Goldfinch",
			"artist": "Carel Fabritius",
			"year": 1654,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/64/Fabritius-vink.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fabritius-vink.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-lacemaker",
			"id": "the-lacemaker",
			"title": "The Lacemaker",
			"artist": "Johannes Vermeer",
			"year": "c. 1669",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/03/Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_lacemaker_(c.1669-1671).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "knight-death-devil",
			"id": "knight-death-devil",
			"title": "Knight, Death and the Devil",
			"artist": "Albrecht Dürer",
			"year": 1513,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Albrecht_D%C3%BCrer_-_Knight%2C_Death_and_the_Devil.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Knight%2C_Death_and_the_Devil.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "adam-and-eve-durer",
			"id": "adam-and-eve-durer",
			"title": "Adam and Eve",
			"artist": "Albrecht Dürer",
			"year": 1504,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Albrecht_D%C3%BCrer%2C_Adam_and_Eve%2C_1504%2C_NGA_6609.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer%2C_Adam_and_Eve%2C_1504%2C_NGA_6609.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "four-horsemen",
			"id": "four-horsemen",
			"title": "The Four Horsemen of the Apocalypse",
			"artist": "Albrecht Dürer",
			"year": 1498,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/29/Durer_Revelation_Four_Riders.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Durer_Revelation_Four_Riders.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "battle-of-alexander",
			"id": "battle-of-alexander",
			"title": "The Battle of Alexander at Issus",
			"artist": "Albrecht Altdorfer",
			"year": 1529,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Albrecht_Altdorfer_-_Schlacht_bei_Issus_%28Alte_Pinakothek%2C_M%C3%BCnchen%29_2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Albrecht_Altdorfer_001.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "descent-from-cross",
			"id": "descent-from-cross",
			"title": "The Descent from the Cross",
			"artist": "Rogier van der Weyden",
			"year": "c. 1435",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Weyden_Deposition.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Weyden_Deposition.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-tempest",
			"id": "the-tempest",
			"title": "The Tempest",
			"artist": "Giorgione",
			"year": "c. 1508",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Accademia_-_La_tempesta_-_Giorgione.jpg/3840px-Accademia_-_La_tempesta_-_Giorgione.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Accademia_-_La_tempesta_-_Giorgione.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "flagellation-christ",
			"id": "flagellation-christ",
			"title": "The Flagellation of Christ",
			"artist": "Piero della Francesca",
			"year": "c. 1460",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Piero_della_Francesca_Flagellazione-gndm-full.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Piero_della_Francesca_Flagellazione-gndm-full.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "tribute-money",
			"id": "tribute-money",
			"title": "The Tribute Money",
			"artist": "Masaccio",
			"year": "c. 1425",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/The_Tribute_Money_Masaccio_Cappella_Brancacci.jpg/3840px-The_Tribute_Money_Masaccio_Cappella_Brancacci.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Tribute_Money_Masaccio_Cappella_Brancacci.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "annunciation-fra-angelico",
			"id": "annunciation-fra-angelico",
			"title": "The Annunciation",
			"artist": "Fra Angelico",
			"year": "c. 1433",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/96/Fra_Angelico_069.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fra_Angelico_069.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "saint-george-dragon",
			"id": "saint-george-dragon",
			"title": "Saint George and the Dragon",
			"artist": "Paolo Uccello",
			"year": "c. 1470",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Paolo_Uccello_-_Hl._Georg_im_Kampf_mit_dem_Drachen.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paolo_Uccello_047.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "dead-christ",
			"id": "dead-christ",
			"title": "The Lamentation over the Dead Christ",
			"artist": "Andrea Mantegna",
			"year": "c. 1480",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Milan_pinacoth%C3%A8que_Lamentation_of_Christ_par_Mantegna.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Milan_pinacoth%C3%A8que_Lamentation_of_Christ_par_Mantegna.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "last-supper-tintoretto",
			"id": "last-supper-tintoretto",
			"title": "The Last Supper",
			"artist": "Tintoretto",
			"year": 1594,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Tintoretto%2C_Jacopo_-_Ultima_cena_-_San_Giorgio_Maggiore.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tintoretto%2C_Jacopo_-_Ultima_cena_-_San_Giorgio_Maggiore.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "wedding-at-cana",
			"id": "wedding-at-cana",
			"title": "The Wedding at Cana",
			"artist": "Paolo Veronese",
			"year": 1563,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Les_Noces_de_Cana_-_Paolo_Veronese_-_Mus%C3%A9e_du_Louvre_Peintures_INV_142_%3B_MR_384.jpg/3840px-Les_Noces_de_Cana_-_Paolo_Veronese_-_Mus%C3%A9e_du_Louvre_Peintures_INV_142_%3B_MR_384.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Les_Noces_de_Cana_-_Paolo_Veronese_-_Mus%C3%A9e_du_Louvre_Peintures_INV_142_%3B_MR_384.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "saint-francis-zurbaran",
			"id": "saint-francis-zurbaran",
			"title": "Saint Francis in Meditation",
			"artist": "Francisco de Zurbarán",
			"year": "c. 1635",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Francisco_de_Zurbar%C3%A1n_053.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francisco_de_Zurbar%C3%A1n_053.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "immaculate-conception-murillo",
			"id": "immaculate-conception-murillo",
			"title": "The Immaculate Conception of Los Venerables",
			"artist": "Bartolomé Esteban Murillo",
			"year": "c. 1678",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/61/Murillo_immaculate_conception.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Murillo_immaculate_conception.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "clubfooted-boy",
			"id": "clubfooted-boy",
			"title": "The Clubfoot",
			"artist": "Jusepe de Ribera",
			"year": 1642,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/El_patizambo%2C_por_Jos%C3%A9_de_Ribera.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_patizambo%2C_por_Jos%C3%A9_de_Ribera.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "birth-venus-cabanel",
			"id": "birth-venus-cabanel",
			"title": "The Birth of Venus",
			"artist": "Alexandre Cabanel",
			"year": 1863,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Alexandre_Cabanel_-_The_Birth_of_Venus_-_Google_Art_Project_3.jpg/3840px-Alexandre_Cabanel_-_The_Birth_of_Venus_-_Google_Art_Project_3.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alexandre_Cabanel_-_The_Birth_of_Venus_-_Google_Art_Project_3.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pollice-verso",
			"id": "pollice-verso",
			"title": "Pollice Verso",
			"artist": "Jean-Léon Gérôme",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Jean-Leon_Gerome_Pollice_Verso.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "light-of-the-world",
			"id": "light-of-the-world",
			"title": "The Light of the World",
			"artist": "William Holman Hunt",
			"year": 1851,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Light_of_the_World_Hunt.jpg/3840px-Light_of_the_World_Hunt.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Light_of_the_World_Hunt.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "proserpine",
			"id": "proserpine",
			"title": "Proserpine",
			"artist": "Dante Gabriel Rossetti",
			"year": 1874,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/37/Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "flaming-june",
			"id": "flaming-june",
			"title": "Flaming June",
			"artist": "Frederic Leighton",
			"year": 1895,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Flaming_June%2C_by_Frederic_Lord_Leighton_%281830-1896%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Flaming_June%2C_by_Frederic_Lord_Leighton_(1830-1896).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hope-watts",
			"id": "hope-watts",
			"title": "Hope",
			"artist": "George Frederic Watts",
			"year": 1886,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/George_Frederick_Watts_-_Hope_-_B2011.32_-_Yale_Center_for_British_Art.jpg/3840px-George_Frederick_Watts_-_Hope_-_B2011.32_-_Yale_Center_for_British_Art.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:George_Frederick_Watts_-_Hope_-_B2011.32_-_Yale_Center_for_British_Art.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ninth-wave",
			"id": "ninth-wave",
			"title": "The Ninth Wave",
			"artist": "Ivan Aivazovsky",
			"year": 1850,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Aivazovsky%2C_Ivan_-_The_Ninth_Wave.jpg/3840px-Aivazovsky%2C_Ivan_-_The_Ninth_Wave.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Aivazovsky%2C_Ivan_-_The_Ninth_Wave.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "morning-pine-forest",
			"id": "morning-pine-forest",
			"title": "Morning in a Pine Forest",
			"artist": "Ivan Shishkin",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg/3840px-Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Shishkin%2C_Ivan_-_Morning_in_a_Pine_Forest.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ivan-terrible",
			"id": "ivan-terrible",
			"title": "Ivan the Terrible and His Son Ivan",
			"artist": "Ilya Repin",
			"year": 1885,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Moscou%2C_galerie_Tretiakov_Ivan_le_Terrible_et_son_fils%2C_par_Ilya_Repine.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Moscou%2C_galerie_Tretiakov_Ivan_le_Terrible_et_son_fils%2C_par_Ilya_Repine.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "grand-canyon-yellowstone",
			"id": "grand-canyon-yellowstone",
			"title": "The Grand Canyon of the Yellowstone",
			"artist": "Thomas Moran",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg/3840px-Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "autumn-hudson",
			"id": "autumn-hudson",
			"title": "Autumn — On the Hudson River",
			"artist": "Jasper Francis Cropsey",
			"year": 1860,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Autumn--On_the_Hudson_River-1860-Jasper_Francis_Cropsey.jpg/3840px-Autumn--On_the_Hudson_River-1860-Jasper_Francis_Cropsey.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Autumn--On_the_Hudson_River-1860-Jasper_Francis_Cropsey.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "lake-george-kensett",
			"id": "lake-george-kensett",
			"title": "Lake George",
			"artist": "John Frederick Kensett",
			"year": 1869,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/John_Frederick_Kensett_-_Lake_George_-_y1994-151_-_Princeton_University_Art_Museum.jpg/3840px-John_Frederick_Kensett_-_Lake_George_-_y1994-151_-_Princeton_University_Art_Museum.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Frederick_Kensett_-_Lake_George_-_y1994-151_-_Princeton_University_Art_Museum.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "officer-laughing-girl",
			"id": "officer-laughing-girl",
			"title": "Officer and Laughing Girl",
			"artist": "Johannes Vermeer",
			"year": "c. 1657",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Johannes_Vermeer_-_De_Soldaat_en_het_Lachende_Meisje_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_De_Soldaat_en_het_Lachende_Meisje_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_De_Soldaat_en_het_Lachende_Meisje_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "courtyard-delft",
			"id": "courtyard-delft",
			"title": "The Courtyard of a House in Delft",
			"artist": "Pieter de Hooch",
			"year": 1658,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Pieter_de_Hooch_001.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_de_Hooch_001.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "jewish-cemetery",
			"id": "jewish-cemetery",
			"title": "The Jewish Cemetery",
			"artist": "Jacob van Ruisdael",
			"year": "c. 1654",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Jacob_Isaackszoon_van_Ruisdael_-_The_Jewish_Cemetery_%281654_or_1655%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacob_Isaackszoon_van_Ruisdael_-_The_Jewish_Cemetery_(1654_or_1655).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "avenue-middelharnis",
			"id": "avenue-middelharnis",
			"title": "The Avenue at Middelharnis",
			"artist": "Meindert Hobbema",
			"year": 1689,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Meindert_Hobbema_001.jpg/3840px-Meindert_Hobbema_001.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Meindert_Hobbema_001.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "feast-of-st-nicholas",
			"id": "feast-of-st-nicholas",
			"title": "The Feast of Saint Nicholas",
			"artist": "Jan Steen",
			"year": "c. 1665",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Jan_Steen_%E2%80%93_Het_Sint-Nicolaasfeest.jpg/3840px-Jan_Steen_%E2%80%93_Het_Sint-Nicolaasfeest.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jan_Steen_-_Het_Sint_Nicolaasfeest.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "judith-holofernes",
			"id": "judith-holofernes",
			"title": "Judith Beheading Holofernes",
			"artist": "Artemisia Gentileschi",
			"year": "c. 1620",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/50/Artemisia_Gentileschi_-_Giuditta_decapita_Oloferne_-_Google_Art_Project-Adjust.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Artemisia_Gentileschi_-_Giuditta_decapita_Oloferne_-_Google_Art_Project-Adjust.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "et-in-arcadia",
			"id": "et-in-arcadia",
			"title": "Et in Arcadia Ego",
			"artist": "Nicolas Poussin",
			"year": "c. 1638",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Nicolas_Poussin_-_Et_in_Arcadia_ego_%28deuxi%C3%A8me_version%29.jpg/3840px-Nicolas_Poussin_-_Et_in_Arcadia_ego_%28deuxi%C3%A8me_version%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Et_in_Arcadia_ego_(deuxi%C3%A8me_version).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "seaport-sunset",
			"id": "seaport-sunset",
			"title": "Seaport at Sunset",
			"artist": "Claude Lorrain",
			"year": 1639,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Port_de_mer_au_soleil_couchant_-_Claude_Gell%C3%A9e_dit_Le_Lorrain_-_Mus%C3%A9e_du_Louvre_Peintures_INV_4715_%3B_MR_1740.jpg/3840px-Port_de_mer_au_soleil_couchant_-_Claude_Gell%C3%A9e_dit_Le_Lorrain_-_Mus%C3%A9e_du_Louvre_Peintures_INV_4715_%3B_MR_1740.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Port_de_mer_au_soleil_couchant_-_Claude_Gell%C3%A9e_dit_Le_Lorrain_-_Mus%C3%A9e_du_Louvre_Peintures_INV_4715_%3B_MR_1740.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ray-chardin",
			"id": "ray-chardin",
			"title": "The Ray",
			"artist": "Jean-Baptiste-Siméon Chardin",
			"year": 1728,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/94/La_Raie_-_Jean_Baptiste_Sim%C3%A9on_Chardin_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3197.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:La_Raie_-_Jean_Baptiste_Sim%C3%A9on_Chardin_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3197.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "annunciation-leonardo",
			"id": "annunciation-leonardo",
			"title": "The Annunciation",
			"artist": "Leonardo da Vinci",
			"year": "c. 1472",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg/3840px-Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "vision-after-sermon",
			"id": "vision-after-sermon",
			"title": "Vision After the Sermon",
			"artist": "Paul Gauguin",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/La_vision_apr%C3%A8s_le_sermon_%28Paul_Gauguin%29.jpg/3840px-La_vision_apr%C3%A8s_le_sermon_%28Paul_Gauguin%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:La_vision_apr%C3%A8s_le_sermon_(Paul_Gauguin).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "moulin-rouge-lautrec",
			"id": "moulin-rouge-lautrec",
			"title": "At the Moulin Rouge",
			"artist": "Henri de Toulouse-Lautrec",
			"year": 1892,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg/3840px-Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "belshazzars-feast",
			"id": "belshazzars-feast",
			"title": "Belshazzar's Feast",
			"artist": "Rembrandt",
			"year": "c. 1635",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Rembrandt-Belsazar.jpg/3840px-Rembrandt-Belsazar.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt-Belsazar.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "return-prodigal",
			"id": "return-prodigal",
			"title": "The Return of the Prodigal Son",
			"artist": "Rembrandt",
			"year": "c. 1668",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg/3840px-Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "descent-cross-rubens",
			"id": "descent-cross-rubens",
			"title": "The Descent from the Cross",
			"artist": "Peter Paul Rubens",
			"year": 1612,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Peter_Paul_Rubens_-_The_Descent_from_the_Cross_%28Antwerp_Cathedral%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Descent_from_the_Cross_(Antwerp_Cathedral).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "garden-of-love",
			"id": "garden-of-love",
			"title": "The Garden of Love",
			"artist": "Peter Paul Rubens",
			"year": "c. 1633",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/El_Jard%C3%ADn_del_Amor_%28Rubens%29.jpg/3840px-El_Jard%C3%ADn_del_Amor_%28Rubens%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_Jard%C3%ADn_del_Amor_(Rubens).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boyhood-raleigh",
			"id": "boyhood-raleigh",
			"title": "The Boyhood of Raleigh",
			"artist": "John Everett Millais",
			"year": 1870,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f0/John_Everett_Millais_%281829-1896%29_-_The_Boyhood_of_Raleigh_-_N01691_-_National_Gallery.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Everett_Millais_(1829-1896)_-_The_Boyhood_of_Raleigh_-_N01691_-_National_Gallery.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "awakening-conscience",
			"id": "awakening-conscience",
			"title": "The Awakening Conscience",
			"artist": "William Holman Hunt",
			"year": 1853,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/William_Holman_Hunt_-_The_Awakening_Conscience_-_Google_Art_Project.jpg/3840px-William_Holman_Hunt_-_The_Awakening_Conscience_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William_Holman_Hunt_-_The_Awakening_Conscience_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "yoshino-waterfall",
			"id": "yoshino-waterfall",
			"title": "The Waterfall Where Yoshitsune Washed His Horse at Yoshino in Yamato Province",
			"artist": "Katsushika Hokusai",
			"year": "c. 1832",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/10/The_Waterfall_Where_Yoshitsune_Washed_His_Horse_at_Yoshino_in_Yamato_Province_%28Wash%C5%AB_Yoshino_Yoshitsune_uma_arai_no_taki%29%2C_from_the_series_A_Tour_of_Waterfalls_in_Various_Provinces_%28Shokoku_taki_meguri%29_MET_DP141250.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Waterfall_Where_Yoshitsune_Washed_His_Horse_at_Yoshino_in_Yamato_Province_(Wash%C5%AB_Yoshino_Yoshitsune_uma_arai_no_taki)%2C_from_the_series_A_Tour_of_Waterfalls_in_Various_Provinces_(Shokoku_taki_meguri)_MET_DP141250.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "cranach-adam-eve",
			"id": "cranach-adam-eve",
			"title": "Adam and Eve",
			"artist": "Lucas Cranach the Elder",
			"year": 1526,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Lucas_Cranach_d.%C3%84._-_Adam_und_Eva_%28Courtauld_Institute_of_Art%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Lucas_Cranach_d.%C3%84._-_Adam_und_Eva_%28Courtauld_Institute_of_Art%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "memling-last-judgment",
			"id": "memling-last-judgment",
			"title": "The Last Judgment",
			"artist": "Hans Memling",
			"year": "c. 1467–1471",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Das_J%C3%BCngste_Gericht_%28Memling%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Das_J%C3%BCngste_Gericht_%28Memling%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bellini-san-zaccaria",
			"id": "bellini-san-zaccaria",
			"title": "San Zaccaria Altarpiece",
			"artist": "Giovanni Bellini",
			"year": 1505,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Pala_di_San_Zaccaria_%28Venezia%29.jpg/3840px-Pala_di_San_Zaccaria_%28Venezia%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pala_di_San_Zaccaria_%28Venezia%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "baptism-christ-verrocchio",
			"id": "baptism-christ-verrocchio",
			"title": "The Baptism of Christ",
			"artist": "Andrea del Verrocchio and Leonardo da Vinci",
			"year": "c. 1472–1475",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Andrea_del_Verrocchio%2C_Leonardo_da_Vinci_-_Baptism_of_Christ_-_Uffizi.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Andrea_del_Verrocchio%2C_Leonardo_da_Vinci_-_Baptism_of_Christ_-_Uffizi.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "death-socrates",
			"id": "death-socrates",
			"title": "The Death of Socrates",
			"artist": "Jacques-Louis David",
			"year": 1787,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/David_-_The_Death_of_Socrates.jpg/3840px-David_-_The_Death_of_Socrates.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "marie-antoinette-lebrun",
			"id": "marie-antoinette-lebrun",
			"title": "Marie Antoinette and Her Children",
			"artist": "Élisabeth Vigée Le Brun",
			"year": 1787,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_de_Lorraine-Habsbourg%2C_reine_de_France_et_ses_enfants_-_Google_Art_Project.jpg/3840px-Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_de_Lorraine-Habsbourg%2C_reine_de_France_et_ses_enfants_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_de_Lorraine-Habsbourg%2C_reine_de_France_et_ses_enfants_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-van-dyck",
			"id": "self-portrait-van-dyck",
			"title": "Self-Portrait",
			"artist": "Anthony van Dyck",
			"year": "c. 1640",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Anthonis_van_Dyck_008.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Anthonis_van_Dyck_008.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "young-woman-pearl",
			"id": "young-woman-pearl",
			"title": "Young Woman with a Pearl Necklace",
			"artist": "Johannes Vermeer",
			"year": "c. 1662–1665",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Jan_Vermeer_van_Delft_-_Young_Woman_with_a_Pearl_Necklace_-_Google_Art_Project.jpg/3840px-Jan_Vermeer_van_Delft_-_Young_Woman_with_a_Pearl_Necklace_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jan_Vermeer_van_Delft_-_Young_Woman_with_a_Pearl_Necklace_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "girl-interrupted",
			"id": "girl-interrupted",
			"title": "Girl Interrupted at Her Music",
			"artist": "Johannes Vermeer",
			"year": "c. 1658–1661",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/14/Vermeer_Girl_Interrupted_at_Her_Music.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vermeer_Girl_Interrupted_at_Her_Music.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "christ-emmaus",
			"id": "christ-emmaus",
			"title": "The Supper at Emmaus",
			"artist": "Caravaggio",
			"year": 1601,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Supper_at_Emmaus-Caravaggio_%281601%29.jpg/3840px-Supper_at_Emmaus-Caravaggio_%281601%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Supper_at_Emmaus-Caravaggio_%281601%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "napoleon-alps",
			"id": "napoleon-alps",
			"title": "Napoleon Crossing the Alps",
			"artist": "Jacques-Louis David",
			"year": 1801,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg/3840px-Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "washerwomen-daumier",
			"id": "washerwomen-daumier",
			"title": "The Laundress",
			"artist": "Honoré Daumier",
			"year": "c. 1863",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/21/Honor%C3%A9_Daumier_-_The_Laundress_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_The_Laundress_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "girl-with-red-hat",
			"id": "girl-with-red-hat",
			"title": "Girl with a Red Hat",
			"artist": "Johannes Vermeer",
			"year": "c. 1665–1667",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Vermeer_-_Girl_with_a_Red_Hat.JPG",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vermeer_-_Girl_with_a_Red_Hat.JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "woman-water-pitcher",
			"id": "woman-water-pitcher",
			"title": "Young Woman with a Water Pitcher",
			"artist": "Johannes Vermeer",
			"year": "c. 1662",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/03/Young_Woman_with_a_Water_Pitcher_MET_DP353257.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Young_Woman_with_a_Water_Pitcher_MET_DP353257.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "malle-babbe",
			"id": "malle-babbe",
			"title": "Malle Babbe",
			"artist": "Frans Hals",
			"year": "c. 1633–1635",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Frans_Hals_-_Malle_Babbe_-_Google_Art_Project.jpg/3840px-Frans_Hals_-_Malle_Babbe_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Malle_Babbe_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "syndics",
			"id": "syndics",
			"title": "The Sampling Officials (The Syndics)",
			"artist": "Rembrandt",
			"year": 1662,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Rembrandt_-_De_Staalmeesters-_het_college_van_staalmeesters_%28waardijns%29_van_het_Amsterdamse_lakenbereidersgilde_-_Google_Art_Project.jpg/3840px-Rembrandt_-_De_Staalmeesters-_het_college_van_staalmeesters_%28waardijns%29_van_het_Amsterdamse_lakenbereidersgilde_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_De_Staalmeesters-_het_college_van_staalmeesters_%28waardijns%29_van_het_Amsterdamse_lakenbereidersgilde_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "flora-rembrandt",
			"id": "flora-rembrandt",
			"title": "Flora",
			"artist": "Rembrandt",
			"year": 1634,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Rembrandt_Harmensz._van_Rijn_059.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_059.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "love-letter-vermeer",
			"id": "love-letter-vermeer",
			"title": "The Love Letter",
			"artist": "Johannes Vermeer",
			"year": "c. 1669–1670",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Johannes_Vermeer_-_%27De_liefdesbrief%27_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_%27De_liefdesbrief%27_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_%27De_liefdesbrief%27_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bacchus-caravaggio",
			"id": "bacchus-caravaggio",
			"title": "Bacchus",
			"artist": "Caravaggio",
			"year": "c. 1596",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Bacchus_by_Caravaggio_1.jpg/3840px-Bacchus_by_Caravaggio_1.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bacchus_by_Caravaggio_1.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "venus-cupid-folly-time",
			"id": "venus-cupid-folly-time",
			"title": "Venus, Cupid, Folly and Time",
			"artist": "Bronzino",
			"year": "c. 1545",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/83/Angelo_Bronzino_-_Venus%2C_Cupid%2C_Folly_and_Time_-_National_Gallery%2C_London.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Angelo_Bronzino_-_Venus%2C_Cupid%2C_Folly_and_Time_-_National_Gallery%2C_London.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "deposition-pontormo",
			"id": "deposition-pontormo",
			"title": "The Deposition from the Cross",
			"artist": "Pontormo",
			"year": "c. 1525–1528",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Jacopo_da_Pontormo_-_Deposizione.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacopo_da_Pontormo_-_Deposizione.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "jupiter-io",
			"id": "jupiter-io",
			"title": "Jupiter and Io",
			"artist": "Correggio",
			"year": "c. 1532–1533",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Antonio_Allegri%2C_called_Correggio_-_Jupiter_and_Io_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Antonio_Allegri%2C_called_Correggio_-_Jupiter_and_Io_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "madonna-long-neck",
			"id": "madonna-long-neck",
			"title": "Madonna with the Long Neck",
			"artist": "Parmigianino",
			"year": "c. 1534–1540",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Parmigianino_-_Madonna_dal_collo_lungo_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Parmigianino_-_Madonna_dal_collo_lungo_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pest-house-gros",
			"id": "pest-house-gros",
			"title": "Bonaparte Visiting the Plague Victims of Jaffa",
			"artist": "Antoine-Jean Gros",
			"year": 1804,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/19/Antoine-Jean_Gros_-_Bonaparte_visitant_les_pestif%C3%A9r%C3%A9s_de_Jaffa.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Antoine-Jean_Gros_-_Bonaparte_visitant_les_pestif%C3%A9r%C3%A9s_de_Jaffa.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "blind-mans-bluff",
			"id": "blind-mans-bluff",
			"title": "Blind-Man's Buff",
			"artist": "Jean-Honoré Fragonard",
			"year": "c. 1750–1752",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Jean-Honor%C3%A9_Fragonard_-_Blind-Man%E2%80%99s_Buff_-_Google_Art_Project.jpg/3840px-Jean-Honor%C3%A9_Fragonard_-_Blind-Man%E2%80%99s_Buff_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Honor%C3%A9_Fragonard_-_Blind-Man%E2%80%99s_Buff_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-vigee",
			"id": "self-portrait-vigee",
			"title": "Self-Portrait in a Straw Hat",
			"artist": "Élisabeth Vigée Le Brun",
			"year": 1782,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Self-portrait_in_a_Straw_Hat_by_Elisabeth-Louise_Vig%C3%A9e-Lebrun.jpg/3840px-Self-portrait_in_a_Straw_Hat_by_Elisabeth-Louise_Vig%C3%A9e-Lebrun.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Self-portrait_in_a_Straw_Hat_by_Elisabeth-Louise_Vig%C3%A9e-Lebrun.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "family-charles-iv",
			"id": "family-charles-iv",
			"title": "Charles IV of Spain and His Family",
			"artist": "Francisco Goya",
			"year": 1800,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/55/La_familia_de_Carlos_IV.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:La_familia_de_Carlos_IV.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "knight-hand-chest",
			"id": "knight-hand-chest",
			"title": "The Nobleman with His Hand on His Chest",
			"artist": "El Greco",
			"year": "c. 1580",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f1/El_caballero_de_la_mano_en_el_pecho.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_caballero_de_la_mano_en_el_pecho.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "water-seller-seville",
			"id": "water-seller-seville",
			"title": "The Waterseller of Seville",
			"artist": "Diego Velázquez",
			"year": "c. 1618–1622",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Diego_Velazquez_-_The_Waterseller_of_Seville.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Diego_Velazquez_-_The_Waterseller_of_Seville.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-spinners",
			"id": "the-spinners",
			"title": "Las Hilanderas (The Spinners)",
			"artist": "Diego Velázquez",
			"year": "c. 1657",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Velazquez-las_hilanderas.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Velazquez-las_hilanderas.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "death-and-miser",
			"id": "death-and-miser",
			"title": "Death and the Miser",
			"artist": "Hieronymus Bosch",
			"year": "c. 1485–1490",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Hieronymus_Bosch_-_Death_and_the_Miser_-_Google_Art_Project.jpg/3840px-Hieronymus_Bosch_-_Death_and_the_Miser_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hieronymus_Bosch_-_Death_and_the_Miser_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "census-bethlehem",
			"id": "census-bethlehem",
			"title": "The Census at Bethlehem",
			"artist": "Pieter Bruegel the Elder",
			"year": 1566,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Pieter_Bruegel_the_Elder_-_The_Numbering_at_Bethlehem_-_Google_Art_Project.jpg/3840px-Pieter_Bruegel_the_Elder_-_The_Numbering_at_Bethlehem_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Numbering_at_Bethlehem_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "magpie-gallows",
			"id": "magpie-gallows",
			"title": "The Magpie on the Gallows",
			"artist": "Pieter Bruegel the Elder",
			"year": 1568,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/24/Pieter_Bruegel_the_Elder-_The_Magpie_on_the_Gallows.JPG",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Magpie_on_the_Gallows.JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "durer-rhinoceros",
			"id": "durer-rhinoceros",
			"title": "The Rhinoceros",
			"artist": "Albrecht Dürer",
			"year": 1515,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/bc/The_Rhinoceros_%28NGA_1964.8.697%29_enhanced.png",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Rhinoceros_%28NGA_1964.8.697%29_enhanced.png",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "holbein-erasmus",
			"id": "holbein-erasmus",
			"title": "Erasmus of Rotterdam",
			"artist": "Hans Holbein the Younger",
			"year": 1523,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/94/Hans_Holbein_d._J._-_Erasmus_-_Louvre.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_d._J._-_Erasmus_-_Louvre.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "praying-hands",
			"id": "praying-hands",
			"title": "Praying Hands",
			"artist": "Albrecht Dürer",
			"year": "c. 1508",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/63/Albrecht_D%C3%BCrer_-_Praying_Hands%2C_1508_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Praying_Hands_-_Albrecht_Durer.png",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "houses-of-parliament",
			"id": "houses-of-parliament",
			"title": "The Houses of Parliament, Sunset",
			"artist": "Claude Monet",
			"year": 1903,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Claude_Monet_-_The_Houses_of_Parliament%2C_Sunset.jpg/3840px-Claude_Monet_-_The_Houses_of_Parliament%2C_Sunset.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Houses_of_Parliament%2C_Sunset.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gare-saint-lazare",
			"id": "gare-saint-lazare",
			"title": "Arrival of the Normandy Train, Gare Saint-Lazare",
			"artist": "Claude Monet",
			"year": 1877,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Claude_Monet_-_Arrival_of_the_Normandy_Train%2C_Gare_Saint-Lazare_-_Google_Art_Project.jpg/3840px-Claude_Monet_-_Arrival_of_the_Normandy_Train%2C_Gare_Saint-Lazare_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Arrival_of_the_Normandy_Train%2C_Gare_Saint-Lazare_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "dance-at-bougival",
			"id": "dance-at-bougival",
			"title": "Dance at Bougival",
			"artist": "Pierre-Auguste Renoir",
			"year": 1883,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Dance-At-Bougival.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Dance-At-Bougival.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-cradle",
			"id": "the-cradle",
			"title": "The Cradle",
			"artist": "Berthe Morisot",
			"year": 1872,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg/3840px-Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fog-warning",
			"id": "fog-warning",
			"title": "The Fog Warning",
			"artist": "Winslow Homer",
			"year": 1885,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Winslow_Homer_-_The_Fog_Warning_-_Google_Art_Project.jpg/3840px-Winslow_Homer_-_The_Fog_Warning_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_The_Fog_Warning_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "max-schmitt",
			"id": "max-schmitt",
			"title": "Max Schmitt in a Single Scull",
			"artist": "Thomas Eakins",
			"year": 1871,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Max_Schmitt_in_a_Single_Scull.jpg/3840px-Max_Schmitt_in_a_Single_Scull.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Max_Schmitt_in_a_Single_Scull.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "voyage-life-childhood",
			"id": "voyage-life-childhood",
			"title": "The Voyage of Life: Childhood",
			"artist": "Thomas Cole",
			"year": 1842,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Thomas_Cole_-_The_Voyage_of_Life_Childhood%2C_1842_%28National_Gallery_of_Art%29.jpg/3840px-Thomas_Cole_-_The_Voyage_of_Life_Childhood%2C_1842_%28National_Gallery_of_Art%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Voyage_of_Life_Childhood_1842.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "cotopaxi",
			"id": "cotopaxi",
			"title": "Cotopaxi",
			"artist": "Frederic Edwin Church",
			"year": 1862,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Frederic_Edwin_Church_-_Cotopaxi_-_Google_Art_Project.jpg/3840px-Frederic_Edwin_Church_-_Cotopaxi_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frederic_Edwin_Church_-_Cotopaxi_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kajikazawa",
			"id": "kajikazawa",
			"title": "Kajikazawa in Kai Province",
			"artist": "Katsushika Hokusai",
			"year": "c. 1830–1832",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Kajikazawa_in_Kai_province.jpg/3840px-Kajikazawa_in_Kai_province.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Kajikazawa_in_Kai_province.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "amida-waterfall",
			"id": "amida-waterfall",
			"title": "The Amida Falls in the Far Reaches of the Kisokaidō Road",
			"artist": "Katsushika Hokusai",
			"year": "c. 1832",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/%E8%AB%B8%E5%9C%8B%E7%80%A7%E5%BB%BB%E3%83%AA_%E6%9C%A8%E6%9B%BD%E8%B7%AF%E3%83%8E%E5%A5%A5_%E9%98%BF%E5%BD%8C%E9%99%80%E3%83%B6%E7%80%A7-The_Amida_Falls_in_the_Far_Reaches_of_the_Kisokaid%C5%8D_Road_%28Kisoji_no_oku_Amida-ga-taki%29%2C_from_the_series_A_Tour_of_Waterfalls_in_Various_Provinces_%28Shokoku_taki_meguri%29_MET_DP141260.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:%E8%AB%B8%E5%9C%8B%E7%80%A7%E5%BB%BB%E3%83%AA_%E6%9C%A8%E6%9B%BD%E8%B7%AF%E3%83%8E%E5%A5%A5_%E9%98%BF%E5%BD%8C%E9%99%80%E3%83%B6%E7%80%A7-The_Amida_Falls_in_the_Far_Reaches_of_the_Kisokaid%C5%8D_Road_%28Kisoji_no_oku_Amida-ga-taki%29%2C_from_the_series_A_Tour_of_Waterfalls_in_Various_Provinces_%28Shokoku_taki_meguri%29_MET_DP141260.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "nihonbashi-hiroshige",
			"id": "nihonbashi-hiroshige",
			"title": "Nihonbashi Bridge",
			"artist": "Utagawa Hiroshige",
			"year": "c. 1830s",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Nihonbashi_Bridge_Ichiryusai_Hiroshige_1830s.png",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Nihonbashi_Bridge_Ichiryusai_Hiroshige_1830s.png",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "shepherdess-bouguereau",
			"id": "shepherdess-bouguereau",
			"title": "The Young Shepherdess",
			"artist": "William-Adolphe Bouguereau",
			"year": 1885,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/19/William-Adolphe_Bouguereau_%281825-1905%29_-_The_Young_Shepherdess_%281885%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William-Adolphe_Bouguereau_%281825-1905%29_-_The_Young_Shepherdess_%281885%29.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "nightmare-fuseli",
			"id": "nightmare-fuseli",
			"title": "The Nightmare",
			"artist": "Henry Fuseli",
			"year": 1781,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Johann_Heinrich_F%C3%BCssli_-_The_Nightmare_55.5.A-d1-2019-04-15.jpg/3840px-Johann_Heinrich_F%C3%BCssli_-_The_Nightmare_55.5.A-d1-2019-04-15.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johann_Heinrich_F%C3%BCssli_-_The_Nightmare_55.5.A-d1-2019-04-15.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ancient-of-days",
			"id": "ancient-of-days",
			"title": "The Ancient of Days",
			"artist": "William Blake",
			"year": 1794,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Europe_a_Prophecy_copy_K_plate_01.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Europe_a_Prophecy_copy_K_plate_01.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "golden-autumn-levitan",
			"id": "golden-autumn-levitan",
			"title": "Golden Autumn",
			"artist": "Isaac Levitan",
			"year": 1895,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Levitan_Zolotaya_Osen.jpg/3840px-Levitan_Zolotaya_Osen.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Levitan_Zolotaya_Osen.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bogatyrs",
			"id": "bogatyrs",
			"title": "Bogatyrs",
			"artist": "Viktor Vasnetsov",
			"year": 1898,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Viktor_Vasnetsov_-_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D1%8B%D1%80%D0%B8_-_Google_Art_Project.jpg/3840px-Viktor_Vasnetsov_-_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D1%8B%D1%80%D0%B8_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Viktor_Vasnetsov_-_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D1%8B%D1%80%D0%B8_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "crossing-the-brook",
			"id": "crossing-the-brook",
			"title": "Crossing the Brook",
			"artist": "J. M. W. Turner",
			"year": 1815,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/59/William_Turner_-_Crossing_the_Brook.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William_Turner_-_Crossing_the_Brook.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "unconscious-rivals",
			"id": "unconscious-rivals",
			"title": "Unconscious Rivals",
			"artist": "Lawrence Alma-Tadema",
			"year": 1893,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Alma-Tadema_Unconscious_Rivals_1893.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alma-Tadema_Unconscious_Rivals_1893.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "maesta-duccio",
			"id": "maesta-duccio",
			"title": "Maestà",
			"artist": "Duccio",
			"year": "c. 1308",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Duccio_maesta1021.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Duccio_maesta1021.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "effects-good-government",
			"id": "effects-good-government",
			"title": "Effects of Good Government in the City",
			"artist": "Ambrogio Lorenzetti",
			"year": "c. 1338",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/11/Ambrogio_Lorenzetti_-_Effects_of_Good_Government_in_the_city_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ambrogio_Lorenzetti_-_Effects_of_Good_Government_in_the_city_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ghent-altarpiece-adoration",
			"id": "ghent-altarpiece-adoration",
			"title": "Ghent Altarpiece: Adoration of the Mystic Lamb",
			"artist": "Jan van Eyck",
			"year": 1432,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Ghent_Altarpiece_D_-_Adoration_of_the_Lamb_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ghent_Altarpiece_D_-_Adoration_of_the_Lamb_2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gin-lane",
			"id": "gin-lane",
			"title": "Gin Lane",
			"artist": "William Hogarth",
			"year": 1751,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d0/William_Hogarth_-_Gin_Lane.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "massacre-chios",
			"id": "massacre-chios",
			"title": "The Massacre at Chios",
			"artist": "Eugène Delacroix",
			"year": 1824,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/66/Eug%C3%A8ne_Delacroix_-_Le_Massacre_de_Scio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Eugène_Delacroix_-_Le_Massacre_de_Scio.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "monk-by-the-sea",
			"id": "monk-by-the-sea",
			"title": "The Monk by the Sea",
			"artist": "Caspar David Friedrich",
			"year": "c. 1809",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/21/Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_Mönch_am_Meer_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "newton-blake",
			"id": "newton-blake",
			"title": "Newton",
			"artist": "William Blake",
			"year": 1795,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Newton-WilliamBlake.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Newton-WilliamBlake.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-wave-courbet",
			"id": "the-wave-courbet",
			"title": "The Wave",
			"artist": "Gustave Courbet",
			"year": 1869,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Gustave_Courbet_-_The_Wave_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Courbet_-_The_Wave_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bonjour-courbet",
			"id": "bonjour-courbet",
			"title": "Bonjour, Monsieur Courbet",
			"artist": "Gustave Courbet",
			"year": 1854,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/93/Gustave_Courbet_-_Bonjour_Monsieur_Courbet_-_Mus%C3%A9e_Fabre.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Courbet_-_Bonjour_Monsieur_Courbet_-_Musée_Fabre.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "church-at-auvers",
			"id": "church-at-auvers",
			"title": "The Church at Auvers",
			"artist": "Vincent van Gogh",
			"year": 1890,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise%2C_View_from_the_Chevet_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise,_View_from_the_Chevet_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "arearea-gauguin",
			"id": "arearea-gauguin",
			"title": "Arearea",
			"artist": "Paul Gauguin",
			"year": 1892,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Paul_Gauguin_-_Arearea_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Gauguin_-_Arearea_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-circus-seurat",
			"id": "the-circus-seurat",
			"title": "The Circus",
			"artist": "Georges Seurat",
			"year": 1891,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/98/Georges_Seurat_-_The_Circus_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat_-_The_Circus_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-apparition-moreau",
			"id": "the-apparition-moreau",
			"title": "The Apparition",
			"artist": "Gustave Moreau",
			"year": 1876,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Gustave_Moreau_-_The_Apparition_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Moreau_-_The_Apparition_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "takiyasha-kuniyoshi",
			"id": "takiyasha-kuniyoshi",
			"title": "Takiyasha the Witch and the Skeleton Spectre",
			"artist": "Utagawa Kuniyoshi",
			"year": "c. 1844",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Takiyasha_the_Witch_and_the_Skeleton_Spectre.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Takiyasha_the_Witch_and_the_Skeleton_Spectre.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "merode-altarpiece",
			"id": "merode-altarpiece",
			"title": "Mérode Altarpiece",
			"artist": "Robert Campin",
			"year": "c. 1428",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Robert_Campin_-_Triptych_with_the_Annunciation%2C_known_as_the_%22Merode_Altarpiece%22_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Robert_Campin_-_Triptych_with_the_Annunciation,_known_as_the_\"Merode_Altarpiece\"_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "adoration-magi-leonardo",
			"id": "adoration-magi-leonardo",
			"title": "Adoration of the Magi",
			"artist": "Leonardo da Vinci",
			"year": "c. 1481",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/27/Leonardo_da_Vinci_-_Adorazione_dei_Magi_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_Adorazione_dei_Magi_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hippopotamus-hunt",
			"id": "hippopotamus-hunt",
			"title": "The Hippopotamus and Crocodile Hunt",
			"artist": "Peter Paul Rubens",
			"year": "c. 1616",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/27/Peter_Paul_Rubens_-_Hippopotamus_and_Crocodile_Hunt_%28Alte_Pinakothek%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Hippopotamus_and_Crocodile_Hunt_(Alte_Pinakothek).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "charles-i-hunt",
			"id": "charles-i-hunt",
			"title": "Charles I at the Hunt",
			"artist": "Anthony van Dyck",
			"year": "c. 1635",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Anthony_van_Dyck_-_Charles_I_at_the_Hunt.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Anthony_van_Dyck_-_Charles_I_at_the_Hunt.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portrait-young-woman-christus",
			"id": "portrait-young-woman-christus",
			"title": "Portrait of a Young Woman",
			"artist": "Petrus Christus",
			"year": "c. 1470",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Petrus_Christus_-_Portrait_of_a_Young_Woman_-_Google_Art_Project.jpg/3840px-Petrus_Christus_-_Portrait_of_a_Young_Woman_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Petrus_Christus_-_Portrait_of_a_Young_Woman_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "samson-delilah-rubens",
			"id": "samson-delilah-rubens",
			"title": "Samson and Delilah",
			"artist": "Peter Paul Rubens",
			"year": "c. 1609",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Samson_and_Delilah_by_Rubens.jpg/3840px-Samson_and_Delilah_by_Rubens.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Samson_and_Delilah_by_Rubens.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "danae-rembrandt",
			"id": "danae-rembrandt",
			"title": "Danaë",
			"artist": "Rembrandt",
			"year": 1636,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Rembrandt._Danae%2C_GD015416.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt._Danae,_GD015416.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "claudius-civilis",
			"id": "claudius-civilis",
			"title": "The Conspiracy of Claudius Civilis",
			"artist": "Rembrandt",
			"year": 1661,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Rembrandt_Harmensz._van_Rijn_-_The_Conspiracy_of_the_Batavians_under_Claudius_Civilis_-_Google_Art_Project.jpg/3840px-Rembrandt_Harmensz._van_Rijn_-_The_Conspiracy_of_the_Batavians_under_Claudius_Civilis_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Conspiracy_of_the_Batavians_under_Claudius_Civilis_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "supper-emmaus-london",
			"id": "supper-emmaus-london",
			"title": "The Supper at Emmaus",
			"artist": "Caravaggio",
			"year": 1601,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/1602-3_Caravaggio%2CSupper_at_Emmaus_National_Gallery%2C_London.jpg/3840px-1602-3_Caravaggio%2CSupper_at_Emmaus_National_Gallery%2C_London.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:1602-3_Caravaggio,Supper_at_Emmaus_National_Gallery,_London.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "marriage-a-la-mode-2",
			"id": "marriage-a-la-mode-2",
			"title": "Marriage A-la-Mode: The Tête à Tête",
			"artist": "William Hogarth",
			"year": "c. 1743",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Marriage_A-la-Mode_2%2C_The_T%C3%AAte_%C3%A0_T%C3%AAte_-_William_Hogarth.jpg/3840px-Marriage_A-la-Mode_2%2C_The_T%C3%AAte_%C3%A0_T%C3%AAte_-_William_Hogarth.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Marriage_A-la-Mode_2,_The_Tête_à_Tête_-_William_Hogarth.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "mr-mrs-andrews",
			"id": "mr-mrs-andrews",
			"title": "Mr and Mrs Andrews",
			"artist": "Thomas Gainsborough",
			"year": "c. 1750",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Thomas_Gainsborough_-_Mr_and_Mrs_Andrews.jpg/3840px-Thomas_Gainsborough_-_Mr_and_Mrs_Andrews.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Thomas_Gainsborough_-_Mr_and_Mrs_Andrews.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "mrs-siddons-reynolds",
			"id": "mrs-siddons-reynolds",
			"title": "Mrs Siddons as the Tragic Muse",
			"artist": "Joshua Reynolds",
			"year": 1789,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/60/Reynolds%2C_Sir_Joshua_-_Mrs_Siddons_as_the_Tragic_Muse_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Reynolds,_Sir_Joshua_-_Mrs_Siddons_as_the_Tragic_Muse_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "women-of-algiers",
			"id": "women-of-algiers",
			"title": "Women of Algiers in their Apartment",
			"artist": "Eugène Delacroix",
			"year": 1849,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/88/Delacroix-femmes_d%27Alger.JPG",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Delacroix-femmes_d'Alger.JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "slave-ship-turner",
			"id": "slave-ship-turner",
			"title": "The Slave Ship",
			"artist": "J. M. W. Turner",
			"year": 1840,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/26/Slave-ship.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Slave-ship.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "where-do-we-come-from",
			"id": "where-do-we-come-from",
			"title": "Where Do We Come From? What Are We? Where Are We Going?",
			"artist": "Paul Gauguin",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gauguin_-_Where_Do_We_Come_From%3F_What_Are_We%3F_Where_Are_We_Going%3F_%281897-98%29.jpg/3840px-Gauguin_-_Where_Do_We_Come_From%3F_What_Are_We%3F_Where_Are_We_Going%3F_%281897-98%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gauguin_-_Where_Do_We_Come_From?_What_Are_We?_Where_Are_We_Going?_(1897-98).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "isle-of-the-dead",
			"id": "isle-of-the-dead",
			"title": "Isle of the Dead",
			"artist": "Arnold Böcklin",
			"year": 1883,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_%28Alte_Nationalgalerie%2C_Berlin%29.jpg/3840px-Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_%28Alte_Nationalgalerie%2C_Berlin%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Arnold_Böcklin_-_Die_Toteninsel_III_(Alte_Nationalgalerie,_Berlin).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "cup-of-tea-cassatt",
			"id": "cup-of-tea-cassatt",
			"title": "The Cup of Tea",
			"artist": "Mary Cassatt",
			"year": "c. 1880",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Cassatt_Mary_The_Cup_of_Tea_1880.jpg/3840px-Cassatt_Mary_The_Cup_of_Tea_1880.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cassatt_Mary_The_Cup_of_Tea_1880.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "agnew-clinic",
			"id": "agnew-clinic",
			"title": "The Agnew Clinic",
			"artist": "Thomas Eakins",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Eakins%2C_Thomas_-_The_Agnew_Clinic.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Eakins,_Thomas_-_The_Agnew_Clinic.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gross-clinic",
			"id": "gross-clinic",
			"title": "The Gross Clinic",
			"artist": "Thomas Eakins",
			"year": 1875,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Thomas_Eakins%2C_American_-_Portrait_of_Dr._Samuel_D._Gross_%28The_Gross_Clinic%29_-_Google_Art_Project.jpg/3840px-Thomas_Eakins%2C_American_-_Portrait_of_Dr._Samuel_D._Gross_%28The_Gross_Clinic%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Thomas_Eakins,_American_-_Portrait_of_Dr._Samuel_D._Gross_(The_Gross_Clinic)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boating-party-cassatt",
			"id": "boating-party-cassatt",
			"title": "The Boating Party",
			"artist": "Mary Cassatt",
			"year": 1893,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg/3840px-Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "looking-down-yosemite",
			"id": "looking-down-yosemite",
			"title": "Looking Down Yosemite Valley",
			"artist": "Albert Bierstadt",
			"year": 1865,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Looking_Down_Yosemite-Valley.jpg/3840px-Looking_Down_Yosemite-Valley.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Looking_Down_Yosemite-Valley.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "watson-and-shark",
			"id": "watson-and-shark",
			"title": "Watson and the Shark",
			"artist": "John Singleton Copley",
			"year": 1778,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Watsonandtheshark-original.jpg/3840px-Watsonandtheshark-original.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Watsonandtheshark-original.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "yellow-christ",
			"id": "yellow-christ",
			"title": "The Yellow Christ",
			"artist": "Paul Gauguin",
			"year": 1889,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/35/Gauguin_Il_Cristo_giallo.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gauguin_Il_Cristo_giallo.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fur-traders-missouri",
			"id": "fur-traders-missouri",
			"title": "Fur Traders Descending the Missouri",
			"artist": "George Caleb Bingham",
			"year": 1845,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Fur_Traders_Descending_the_Missouri_MET_DP316875.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fur_Traders_Descending_the_Missouri_MET_DP316875.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "dejeuner-sur-herbe",
			"id": "dejeuner-sur-herbe",
			"title": "Luncheon on the Grass",
			"artist": "Édouard Manet",
			"year": 1863,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg/3840px-Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "dance-moulin-galette",
			"id": "dance-moulin-galette",
			"title": "Dance at Le Moulin de la Galette",
			"artist": "Pierre-Auguste Renoir",
			"year": 1876,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette_-_Google_Art_Project.jpg/2560px-Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "two-men-contemplating-moon",
			"id": "two-men-contemplating-moon",
			"title": "Two Men Contemplating the Moon",
			"artist": "Caspar David Friedrich",
			"year": "c. 1820",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Caspar_David_Friedrich_-_Two_Men_Contemplating_the_Moon_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Two_Men_Contemplating_the_Moon_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sea-of-ice",
			"id": "sea-of-ice",
			"title": "The Sea of Ice",
			"artist": "Caspar David Friedrich",
			"year": 1824,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "woman-at-window-friedrich",
			"id": "woman-at-window-friedrich",
			"title": "Woman at a Window",
			"artist": "Caspar David Friedrich",
			"year": 1822,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Caspar_David_Friedrich_-_Frau_am_Fenster_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Frau_am_Fenster_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kindred-spirits",
			"id": "kindred-spirits",
			"title": "Kindred Spirits",
			"artist": "Asher Brown Durand",
			"year": 1849,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Asher_Durand_Kindred_Spirits.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Asher_Durand_Kindred_Spirits.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "niagara-church",
			"id": "niagara-church",
			"title": "Niagara Falls, from the American Side",
			"artist": "Frederic Edwin Church",
			"year": 1867,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Frederic_Edwin_Church_-_Niagara_Falls%2C_from_the_American_Side_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frederic_Edwin_Church_-_Niagara_Falls,_from_the_American_Side_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "snap-the-whip",
			"id": "snap-the-whip",
			"title": "Snap the Whip",
			"artist": "Winslow Homer",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Winslow_Homer_-_Snap_the_Whip_%28Butler_Institute_of_American_Art%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_Snap_the_Whip_(Butler_Institute_of_American_Art).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "anguissola-easel",
			"id": "anguissola-easel",
			"title": "Self-Portrait at the Easel",
			"artist": "Sofonisba Anguissola",
			"year": 1556,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Self-portrait_at_the_Easel_Painting_a_Devotional_Panel_by_Sofonisba_Anguissola.jpg/3840px-Self-portrait_at_the_Easel_Painting_a_Devotional_Panel_by_Sofonisba_Anguissola.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Self-portrait_at_the_Easel_Painting_a_Devotional_Panel_by_Sofonisba_Anguissola.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "judith-maidservant-artemisia",
			"id": "judith-maidservant-artemisia",
			"title": "Judith and Her Maidservant",
			"artist": "Artemisia Gentileschi",
			"year": "c. 1624",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Artemisia_Gentileschi_-_Judith_and_Her_Maidservant_with_the_Head_of_Holofernes_-_52.253_-_Detroit_Institute_of_Arts.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Artemisia_Gentileschi_-_Judith_and_Her_Maidservant_with_the_Head_of_Holofernes_-_52.253_-_Detroit_Institute_of_Arts.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "summers-day-morisot",
			"id": "summers-day-morisot",
			"title": "Summer's Day",
			"artist": "Berthe Morisot",
			"year": 1879,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Berthe_Morisot_-_Jour_d%27%C3%A9t%C3%A9%2C_1879.jpg/3840px-Berthe_Morisot_-_Jour_d%27%C3%A9t%C3%A9%2C_1879.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Berthe_Morisot_-_Jour_d'été,_1879.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "coronation-napoleon",
			"id": "coronation-napoleon",
			"title": "The Coronation of Napoleon",
			"artist": "Jacques-Louis David",
			"year": 1807,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/3840px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-balcony-manet",
			"id": "the-balcony-manet",
			"title": "The Balcony",
			"artist": "Édouard Manet",
			"year": 1868,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Edouard_Manet_-_The_Balcony_-_Google_Art_Project.jpg/3840px-Edouard_Manet_-_The_Balcony_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_-_The_Balcony_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boulevard-des-capucines",
			"id": "boulevard-des-capucines",
			"title": "Boulevard des Capucines",
			"artist": "Claude Monet",
			"year": 1873,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Claude_Monet_-_Boulevard_des_Capucines_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Boulevard_des_Capucines_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "little-street-vermeer",
			"id": "little-street-vermeer",
			"title": "The Little Street",
			"artist": "Johannes Vermeer",
			"year": "c. 1658",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Johannes_Vermeer_-_Gezicht_op_huizen_in_Delft%2C_bekend_als_%27Het_straatje%27_-_Google_Art_Project.jpg/3840px-Johannes_Vermeer_-_Gezicht_op_huizen_in_Delft%2C_bekend_als_%27Het_straatje%27_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Gezicht_op_huizen_in_Delft,_bekend_als_'Het_straatje'_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "art-of-painting",
			"id": "art-of-painting",
			"title": "The Art of Painting",
			"artist": "Johannes Vermeer",
			"year": "c. 1668",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg/3840px-Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "storm-on-sea-galilee",
			"id": "storm-on-sea-galilee",
			"title": "Christ in the Storm on the Sea of Galilee",
			"artist": "Rembrandt",
			"year": 1633,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "soap-bubbles-chardin",
			"id": "soap-bubbles-chardin",
			"title": "Soap Bubbles",
			"artist": "Jean-Baptiste-Siméon Chardin",
			"year": "c. 1734",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Jean_Sim%C3%A9on_Chardin_-_Soap_Bubbles_-_Google_Art_Project.jpg/3840px-Jean_Sim%C3%A9on_Chardin_-_Soap_Bubbles_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean_Siméon_Chardin_-_Soap_Bubbles_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "intervention-sabines",
			"id": "intervention-sabines",
			"title": "The Intervention of the Sabine Women",
			"artist": "Jacques-Louis David",
			"year": 1799,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/The_Intervention_of_the_Sabine_Women_-_David_%28Louvre_INV_3691%29.jpg/3840px-The_Intervention_of_the_Sabine_Women_-_David_%28Louvre_INV_3691%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Intervention_of_the_Sabine_Women_-_David_(Louvre_INV_3691).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "the-mill-rembrandt",
			"id": "the-mill-rembrandt",
			"title": "The Mill",
			"artist": "Rembrandt",
			"year": "c. 1648",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Rembrandt_van_Rijn_-_The_Mill_-_Google_Art_Project.jpg/3840px-Rembrandt_van_Rijn_-_The_Mill_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_van_Rijn_-_The_Mill_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "woman-at-toilette",
			"id": "woman-at-toilette",
			"title": "Woman at Her Toilette",
			"artist": "Berthe Morisot",
			"year": "c. 1880",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Berthe_Morisot_-_Woman_at_Her_Toilette_-_1924.127_-_Art_Institute_of_Chicago.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Berthe_Morisot_-_Woman_at_Her_Toilette_-_1924.127_-_Art_Institute_of_Chicago.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "athenaeum-portrait",
			"id": "athenaeum-portrait",
			"title": "George Washington (Athenaeum Portrait)",
			"artist": "Gilbert Stuart",
			"year": 1796,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gilbert_Stuart_-_George_Washington_%28The_Athenaeum_Portrait%29_-_Google_Art_Project.jpg/3840px-Gilbert_Stuart_-_George_Washington_%28The_Athenaeum_Portrait%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gilbert_Stuart_-_George_Washington_(The_Athenaeum_Portrait)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "assumption-el-greco",
			"id": "assumption-el-greco",
			"title": "The Assumption of the Virgin",
			"artist": "El Greco",
			"year": 1577,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Domenikos_Theotok%C3%B3poulos%2C_called_El_Greco_-_The_Assumption_of_the_Virgin_-_Google_Art_Project.jpg/3840px-Domenikos_Theotok%C3%B3poulos%2C_called_El_Greco_-_The_Assumption_of_the_Virgin_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Domenikos_Theotokópoulos,_called_El_Greco_-_The_Assumption_of_the_Virgin_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "poplars-monet",
			"id": "poplars-monet",
			"title": "Poplars on the Epte",
			"artist": "Claude Monet",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Claude_Monet_-_Poplars_on_the_Epte_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Poplars_on_the_Epte_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sower-millet",
			"id": "sower-millet",
			"title": "The Sower",
			"artist": "Jean-François Millet",
			"year": 1850,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg/3840px-Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-François_Millet_-_The_Sower_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "prisoners-from-front",
			"id": "prisoners-from-front",
			"title": "Prisoners from the Front",
			"artist": "Winslow Homer",
			"year": 1866,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Winslow_Homer_-_Prisoners_from_the_Front.jpg/3840px-Winslow_Homer_-_Prisoners_from_the_Front.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_Prisoners_from_the_Front.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "calumny-apelles",
			"id": "calumny-apelles",
			"title": "Calumny of Apelles",
			"artist": "Sandro Botticelli",
			"year": 1495,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sandro_Botticelli_La_calumnia_de_Apeles.jpg/3000px-Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bacchus-ariadne",
			"id": "bacchus-ariadne",
			"title": "Bacchus and Ariadne",
			"artist": "Titian",
			"year": 1523,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Titian_-_Bacchus_and_Ariadne_-_Google_Art_Project.jpg/3000px-Titian_-_Bacchus_and_Ariadne_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Titian_-_Bacchus_and_Ariadne_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "feast-house-levi",
			"id": "feast-house-levi",
			"title": "The Feast in the House of Levi",
			"artist": "Paolo Veronese",
			"year": 1573,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/The_Feast_in_the_House_of_Levi_%28edited%29.jpg/3840px-The_Feast_in_the_House_of_Levi_%28edited%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Feast_in_the_House_of_Levi_(edited).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "eleanor-toledo",
			"id": "eleanor-toledo",
			"title": "Eleanor of Toledo with Her Son Giovanni",
			"artist": "Bronzino",
			"year": 1545,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bronzino_-_Eleonora_di_Toledo_col_figlio_Giovanni_-_Google_Art_Project.jpg/2553px-Bronzino_-_Eleonora_di_Toledo_col_figlio_Giovanni_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bronzino_-_Eleonora_di_Toledo_col_figlio_Giovanni_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "susanna-elders",
			"id": "susanna-elders",
			"title": "Susanna and the Elders",
			"artist": "Artemisia Gentileschi",
			"year": 1610,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Susanna_and_the_Elders_%281610%29%2C_Artemisia_Gentileschi.jpg/3840px-Susanna_and_the_Elders_%281610%29%2C_Artemisia_Gentileschi.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "polish-rider",
			"id": "polish-rider",
			"title": "The Polish Rider",
			"artist": "Rembrandt",
			"year": 1655,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Rembrandt_-_De_Poolse_ruiter%2C_c.1655_%28Frick_Collection%29.jpg/3840px-Rembrandt_-_De_Poolse_ruiter%2C_c.1655_%28Frick_Collection%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_De_Poolse_ruiter,_c.1655_(Frick_Collection).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hannibal-alps",
			"id": "hannibal-alps",
			"title": "Snow Storm: Hannibal and his Army Crossing the Alps",
			"artist": "J. M. W. Turner",
			"year": 1812,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Joseph_Mallord_William_Turner_081.jpg/1536px-Joseph_Mallord_William_Turner_081.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_081.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "beata-beatrix",
			"id": "beata-beatrix",
			"title": "Beata Beatrix",
			"artist": "Dante Gabriel Rossetti",
			"year": 1870,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Dante_Gabriel_Rossetti_-_Beata_Beatrix%2C_1864-1870.jpg/2506px-Dante_Gabriel_Rossetti_-_Beata_Beatrix%2C_1864-1870.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Dante_Gabriel_Rossetti_-_Beata_Beatrix,_1864-1870.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "scapegoat",
			"id": "scapegoat",
			"title": "The Scapegoat",
			"artist": "William Holman Hunt",
			"year": 1854,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/William_Holman_Hunt_-_The_Scapegoat.jpg/3716px-William_Holman_Hunt_-_The_Scapegoat.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William_Holman_Hunt_-_The_Scapegoat.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "christ-carpenters-shop",
			"id": "christ-carpenters-shop",
			"title": "Christ in the House of His Parents",
			"artist": "John Everett Millais",
			"year": 1850,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/John_Everett_Millais_-_Christ_in_the_House_of_His_Parents_%28%60The_Carpenter%27s_Shop%27%29_-_Google_Art_Project.jpg/3840px-John_Everett_Millais_-_Christ_in_the_House_of_His_Parents_%28%60The_Carpenter%27s_Shop%27%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Everett_Millais_-_Christ_in_the_House_of_His_Parents_(%60The_Carpenter%27s_Shop%27)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "golden-stairs",
			"id": "golden-stairs",
			"title": "The Golden Stairs",
			"artist": "Edward Burne-Jones",
			"year": 1880,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Edward_Burne-Jones_The_Golden_Stairs.jpg/1287px-Edward_Burne-Jones_The_Golden_Stairs.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_The_Golden_Stairs.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "elevation-of-cross",
			"id": "elevation-of-cross",
			"title": "The Elevation of the Cross",
			"artist": "Peter Paul Rubens",
			"year": 1610,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Peter_Paul_Rubens_-_Raising_of_the_Cross_-_1610.jpg/3215px-Peter_Paul_Rubens_-_Raising_of_the_Cross_-_1610.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Raising_of_the_Cross_-_1610.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "snake-charmer",
			"id": "snake-charmer",
			"title": "The Snake Charmer",
			"artist": "Jean-Léon Gérôme",
			"year": 1879,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Le_charmeur_de_serpents.jpg/3840px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Le_charmeur_de_serpents.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Le_charmeur_de_serpents.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "prayer-mosque",
			"id": "prayer-mosque",
			"title": "Prayer in the Mosque",
			"artist": "Jean-Léon Gérôme",
			"year": 1871,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Prayer_in_the_Mosque.jpg/3137px-Prayer_in_the_Mosque.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Prayer_in_the_Mosque.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fallen-angel",
			"id": "fallen-angel",
			"title": "Fallen Angel",
			"artist": "Alexandre Cabanel",
			"year": 1847,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Alexandre_Cabanel_-_Fallen_Angel.jpg/3732px-Alexandre_Cabanel_-_Fallen_Angel.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alexandre_Cabanel_-_Fallen_Angel.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "nymphs-and-satyr",
			"id": "nymphs-and-satyr",
			"title": "Nymphs and Satyr",
			"artist": "William-Adolphe Bouguereau",
			"year": 1873,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/William-Adolphe_Bouguereau_%281825-1905%29_-_Nymphs_and_Satyr_%281873%29.jpg/1580px-William-Adolphe_Bouguereau_%281825-1905%29_-_Nymphs_and_Satyr_%281873%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:William-Adolphe_Bouguereau_(1825-1905)_-_Nymphs_and_Satyr_(1873).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boulevard-montmartre",
			"id": "boulevard-montmartre",
			"title": "Boulevard Montmartre",
			"artist": "Camille Pissarro",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Camille_Pissarro_-_Boulevard_Montmartre_-_Eremitage.jpg/3840px-Camille_Pissarro_-_Boulevard_Montmartre_-_Eremitage.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Camille_Pissarro_-_Boulevard_Montmartre_-_Eremitage.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "floor-scrapers",
			"id": "floor-scrapers",
			"title": "The Floor Scrapers",
			"artist": "Gustave Caillebotte",
			"year": 1875,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Gustave_Caillebotte_-_The_Floor_Planers_-_Google_Art_Project.jpg/3840px-Gustave_Caillebotte_-_The_Floor_Planers_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Gustave_Caillebotte_-_The_Floor_Planers_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "olive-trees",
			"id": "olive-trees",
			"title": "Olive Trees",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Vincent_van_Gogh_-_Olive_Trees_-_Google_Art_Project.jpg/3840px-Vincent_van_Gogh_-_Olive_Trees_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Olive_Trees_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "night-cafe",
			"id": "night-cafe",
			"title": "The Night Café",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Le_caf%C3%A9_de_nuit_%28The_Night_Caf%C3%A9%29_by_Vincent_van_Gogh.jpeg/3840px-Le_caf%C3%A9_de_nuit_%28The_Night_Caf%C3%A9%29_by_Vincent_van_Gogh.jpeg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Le_caf%C3%A9_de_nuit_(The_Night_Caf%C3%A9)_by_Vincent_van_Gogh.jpeg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "reply-zaporozhians",
			"id": "reply-zaporozhians",
			"title": "Reply of the Zaporozhian Cossacks",
			"artist": "Ilya Repin",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Ilja_Jefimowitsch_Repin_-_Reply_of_the_Zaporozhian_Cossacks_-_Yorck.jpg/3840px-Ilja_Jefimowitsch_Repin_-_Reply_of_the_Zaporozhian_Cossacks_-_Yorck.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ilja_Jefimowitsch_Repin_-_Reply_of_the_Zaporozhian_Cossacks_-_Yorck.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boyarina-morozova",
			"id": "boyarina-morozova",
			"title": "Boyarina Morozova",
			"artist": "Vasily Surikov",
			"year": 1887,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Vasily_Surikov_-_%D0%91%D0%BE%D1%8F%D1%80%D1%8B%D0%BD%D1%8F_%D0%9C%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%B0_-_Google_Art_Project.jpg/3840px-Vasily_Surikov_-_%D0%91%D0%BE%D1%8F%D1%80%D1%8B%D0%BD%D1%8F_%D0%9C%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%B0_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vasily_Surikov_-_%D0%91%D0%BE%D1%8F%D1%80%D1%8B%D0%BD%D1%8F_%D0%9C%D0%BE%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D0%B0_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "over-eternal-peace",
			"id": "over-eternal-peace",
			"title": "Over Eternal Peace",
			"artist": "Isaac Levitan",
			"year": 1894,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Isaac_Levitan_-_Au-dessus_du_repos_%C3%A9ternel.jpg/2707px-Isaac_Levitan_-_Au-dessus_du_repos_%C3%A9ternel.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Isaac_Levitan_-_Au-dessus_du_repos_%C3%A9ternel.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "rye-shishkin",
			"id": "rye-shishkin",
			"title": "Rye",
			"artist": "Ivan Shishkin",
			"year": 1878,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Ivan_Shishkin_-_%D0%A0%D0%BE%D0%B6%D1%8C_-_Google_Art_Project.jpg/3840px-Ivan_Shishkin_-_%D0%A0%D0%BE%D0%B6%D1%8C_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ivan_Shishkin_-_%D0%A0%D0%BE%D0%B6%D1%8C_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "black-sea-aivazovsky",
			"id": "black-sea-aivazovsky",
			"title": "The Black Sea",
			"artist": "Ivan Aivazovsky",
			"year": 1881,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/%D0%98%D0%B2%D0%B0%D0%BD_%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82%D0%B8%D0%BD%D0%BE%D0%B2%D0%B8%D1%87_%D0%90%D0%B9%D0%B2%D0%B0%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_-_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5_%28%D0%BD%D0%B0_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%BC_%D0%BC%D0%BE%D1%80%D0%B5_%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D0%B5%D1%82_%D1%80%D0%B0%D0%B7%D1%8B%D0%B3%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F_%D0%B1%D1%83%D1%80%D1%8F%29_-_Google_Art_Project.jpg/3840px-thumbnail.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:%D0%98%D0%B2%D0%B0%D0%BD_%D0%9A%D0%BE%D0%BD%D1%81%D1%82%D0%B0%D0%BD%D1%82%D0%B8%D0%BD%D0%BE%D0%B2%D0%B8%D1%87_%D0%90%D0%B9%D0%B2%D0%B0%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_-_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%B5_%D0%BC%D0%BE%D1%80%D0%B5_(%D0%BD%D0%B0_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%BC_%D0%BC%D0%BE%D1%80%D0%B5_%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D0%B5%D1%82_%D1%80%D0%B0%D0%B7%D1%8B%D0%B3%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F_%D0%B1%D1%83%D1%80%D1%8F)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "cyclops-redon",
			"id": "cyclops-redon",
			"title": "The Cyclops",
			"artist": "Odilon Redon",
			"year": 1914,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Odilon_Redon_-_The_Cyclops%2C_c._1914.jpg/2846px-Odilon_Redon_-_The_Cyclops%2C_c._1914.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Odilon_Redon_-_The_Cyclops,_c._1914.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "spirit-dead-watching",
			"id": "spirit-dead-watching",
			"title": "Spirit of the Dead Watching",
			"artist": "Paul Gauguin",
			"year": 1892,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Paul_Gauguin-_Manao_tupapau_%28The_Spirit_of_the_Dead_Keep_Watch%29.JPG/3840px-Paul_Gauguin-_Manao_tupapau_%28The_Spirit_of_the_Dead_Keep_Watch%29.JPG",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Gauguin-_Manao_tupapau_(The_Spirit_of_the_Dead_Keep_Watch).JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "witches-sabbath",
			"id": "witches-sabbath",
			"title": "Witches' Sabbath (The Great He-Goat)",
			"artist": "Francisco Goya",
			"year": 1823,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Francisco_de_Goya_y_Lucientes_-_Witches%27_Sabbath_%28The_Great_He-Goat%29.jpg/3051px-Francisco_de_Goya_y_Lucientes_-_Witches%27_Sabbath_%28The_Great_He-Goat%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya_y_Lucientes_-_Witches%27_Sabbath_(The_Great_He-Goat).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boy-red-vest",
			"id": "boy-red-vest",
			"title": "Boy in a Red Waistcoat",
			"artist": "Paul Cézanne",
			"year": 1890,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Paul_C%C3%A9zanne_-_Boy_in_a_Red_Waistcoat_-_Google_Art_Project.jpg/3637px-Paul_C%C3%A9zanne_-_Boy_in_a_Red_Waistcoat_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_C%C3%A9zanne_-_Boy_in_a_Red_Waistcoat_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hakone-lake",
			"id": "hakone-lake",
			"title": "The Lake at Hakone",
			"artist": "Utagawa Hiroshige",
			"year": 1858,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Hiroshige%2C_The_lake_in_Hakone%2C_1858.jpg/3840px-Hiroshige%2C_The_lake_in_Hakone%2C_1858.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hiroshige,_The_lake_in_Hakone,_1858.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kirifuri-waterfall",
			"id": "kirifuri-waterfall",
			"title": "Kirifuri Waterfall on Mount Kurokami",
			"artist": "Katsushika Hokusai",
			"year": 1832,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Katsushika_Hokusai%2C_Japanese_-_Pilgrims_at_Kirifuri_Waterfall_on_Mount_Kurokami_in_Shimotsuke_Province_-_Google_Art_Project.jpg/3548px-Katsushika_Hokusai%2C_Japanese_-_Pilgrims_at_Kirifuri_Waterfall_on_Mount_Kurokami_in_Shimotsuke_Province_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai,_Japanese_-_Pilgrims_at_Kirifuri_Waterfall_on_Mount_Kurokami_in_Shimotsuke_Province_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ejiri-suruga",
			"id": "ejiri-suruga",
			"title": "Ejiri in Suruga Province",
			"artist": "Katsushika Hokusai",
			"year": 1830,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Ejiri_in_the_Suruga_province.jpg/3840px-Ejiri_in_the_Suruga_province.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ejiri_in_the_Suruga_province.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kauffman-muse",
			"id": "kauffman-muse",
			"title": "Self-Portrait as the Muse of Painting",
			"artist": "Angelica Kauffman",
			"year": 1787,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Angelica_Kauffmann_Self_Portrait_as_the_Muse_of_Painting.jpg/3840px-Angelica_Kauffmann_Self_Portrait_as_the_Muse_of_Painting.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Angelica_Kauffmann_Self_Portrait_as_the_Muse_of_Painting.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "marie-antoinette-rose",
			"id": "marie-antoinette-rose",
			"title": "Marie Antoinette with a Rose",
			"artist": "Élisabeth Vigée Le Brun",
			"year": 1783,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_dit_%C2%AB_%C3%A0_la_Rose_%C2%BB_-_Google_Art_Project.jpg/3840px-Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_dit_%C2%AB_%C3%A0_la_Rose_%C2%BB_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Louise_Elisabeth_Vig%C3%A9e-Lebrun_-_Marie-Antoinette_dit_%C2%AB_%C3%A0_la_Rose_%C2%BB_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "langlois-bridge",
			"id": "langlois-bridge",
			"title": "The Langlois Bridge",
			"artist": "Vincent van Gogh",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Vincent_van_Gogh_-_De_brug_van_Langlois_-_Google_Art_Project.jpg/3840px-Vincent_van_Gogh_-_De_brug_van_Langlois_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_De_brug_van_Langlois_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "colossus-goya",
			"id": "colossus-goya",
			"title": "The Colossus",
			"artist": "Francisco Goya (attributed)",
			"year": 1808,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/El_coloso.jpg/1708px-El_coloso.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:El_coloso.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "barges-saint-mammes",
			"id": "barges-saint-mammes",
			"title": "Barges at Saint-Mammès",
			"artist": "Alfred Sisley",
			"year": 1885,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Alfred_Sisley_029.jpg/2560px-Alfred_Sisley_029.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alfred_Sisley_029.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "lamentation-giotto",
			"id": "lamentation-giotto",
			"title": "Lamentation (The Mourning of Christ)",
			"artist": "Giotto",
			"year": 1305,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Compianto_sul_Cristo_morto.jpg/3840px-Compianto_sul_Cristo_morto.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Compianto_sul_Cristo_morto.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kiss-of-judas",
			"id": "kiss-of-judas",
			"title": "The Arrest of Christ (Kiss of Judas)",
			"artist": "Giotto",
			"year": 1305,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg/3371px-Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "annunciation-simone",
			"id": "annunciation-simone",
			"title": "Annunciation with St. Margaret and St. Ansanus",
			"artist": "Simone Martini and Lippo Memmi",
			"year": 1333,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Simone_Martini_and_Lippo_Memmi_-_Annunciazione_-_Google_Art_Project.jpg/3840px-Simone_Martini_and_Lippo_Memmi_-_Annunciazione_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Simone_Martini_and_Lippo_Memmi_-_Annunciazione_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "temptation-mount-duccio",
			"id": "temptation-mount-duccio",
			"title": "The Temptation of Christ on the Mountain",
			"artist": "Duccio",
			"year": 1311,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Duccio_-_The_Temptation_on_the_Mount.jpg/3840px-Duccio_-_The_Temptation_on_the_Mount.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Duccio_-_The_Temptation_on_the_Mount.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "allegory-painting-artemisia",
			"id": "allegory-painting-artemisia",
			"title": "Self-Portrait as the Allegory of Painting",
			"artist": "Artemisia Gentileschi",
			"year": 1639,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Self-portrait_as_the_Allegory_of_Painting_%28La_Pittura%29_-_Artemisia_Gentileschi.jpg/3767px-Self-portrait_as_the_Allegory_of_Painting_%28La_Pittura%29_-_Artemisia_Gentileschi.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Self-portrait_as_the_Allegory_of_Painting_(La_Pittura)_-_Artemisia_Gentileschi.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bahram-gur-treasure",
			"id": "bahram-gur-treasure",
			"title": "Bahram Gur Finds Jamshid's Treasure",
			"artist": "Anonymous (Great Mongol Shahnameh)",
			"year": 1330,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bahram_Gur_finds_Jamshid%27s_treasure%2C_Folio_from_a_Great_Mongol_Shahnameh.jpg/2639px-Bahram_Gur_finds_Jamshid%27s_treasure%2C_Folio_from_a_Great_Mongol_Shahnameh.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bahram_Gur_finds_Jamshid%27s_treasure,_Folio_from_a_Great_Mongol_Shahnameh.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "utamaro-beauty-pipe",
			"id": "utamaro-beauty-pipe",
			"title": "Beauty Smoking a Pipe after Bathing",
			"artist": "Kitagawa Utamaro",
			"year": 1793,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Beauty_Smoking_a_Pipe_after_Bathing_LACMA_M.2003.168.3.jpg/1441px-Beauty_Smoking_a_Pipe_after_Bathing_LACMA_M.2003.168.3.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Beauty_Smoking_a_Pipe_after_Bathing_LACMA_M.2003.168.3.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "entry-jerusalem-vandyck",
			"id": "entry-jerusalem-vandyck",
			"title": "Entry of Christ into Jerusalem",
			"artist": "Anthony van Dyck",
			"year": 1617,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Entry_of_Christ_into_Jerusalem_by_Anthony_van_Dyck.jpg/3840px-Entry_of_Christ_into_Jerusalem_by_Anthony_van_Dyck.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Entry_of_Christ_into_Jerusalem_by_Anthony_van_Dyck.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "utamaro-courtesan-scroll",
			"id": "utamaro-courtesan-scroll",
			"title": "Courtesan Holding a Scroll",
			"artist": "Kitagawa Utamaro",
			"year": 1792,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Courtesan%2C_head-and-shoulders_portrait%2C_facing_left%2C_holding_a_scroll_and_chewing_on_the_end_of_a_brush_LCCN2008661201.jpg/3840px-Courtesan%2C_head-and-shoulders_portrait%2C_facing_left%2C_holding_a_scroll_and_chewing_on_the_end_of_a_brush_LCCN2008661201.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Courtesan,_head-and-shoulders_portrait,_facing_left,_holding_a_scroll_and_chewing_on_the_end_of_a_brush_LCCN2008661201.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "expulsion-paradise",
			"id": "expulsion-paradise",
			"title": "Expulsion from the Garden of Eden",
			"artist": "Masaccio",
			"year": 1425,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg/3840px-Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "battle-san-romano",
			"id": "battle-san-romano",
			"title": "The Battle of San Romano",
			"artist": "Paolo Uccello",
			"year": 1438,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/San_Romano_Battle_%28Paolo_Uccello%2C_London%29_01.jpg/3840px-San_Romano_Battle_%28Paolo_Uccello%2C_London%29_01.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:San_Romano_Battle_(Paolo_Uccello%2C_London)_01.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "miracle-of-the-slave",
			"id": "miracle-of-the-slave",
			"title": "Miracle of the Slave",
			"artist": "Jacopo Tintoretto",
			"year": 1548,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Tintoretto_-_Miracle_of_the_Slave.jpg/3840px-Tintoretto_-_Miracle_of_the_Slave.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tintoretto_-_Miracle_of_the_Slave.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "origin-milky-way",
			"id": "origin-milky-way",
			"title": "The Origin of the Milky Way",
			"artist": "Jacopo Tintoretto",
			"year": 1575,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Jacopo_Tintoretto_-_The_Origin_of_the_Milky_Way_-_Google_Art_Project.jpg/3000px-Jacopo_Tintoretto_-_The_Origin_of_the_Milky_Way_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacopo_Tintoretto_-_The_Origin_of_the_Milky_Way_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "agnus-dei-zurbaran",
			"id": "agnus-dei-zurbaran",
			"title": "Agnus Dei",
			"artist": "Francisco de Zurbarán",
			"year": 1635,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Francisco_de_Zurbar%C3%A1n_006.jpg/2952px-Francisco_de_Zurbar%C3%A1n_006.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francisco_de_Zurbar%C3%A1n_006.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "whistlejacket",
			"id": "whistlejacket",
			"title": "Whistlejacket",
			"artist": "George Stubbs",
			"year": 1762,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Whistlejacket_by_George_Stubbs.jpg/3840px-Whistlejacket_by_George_Stubbs.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Whistlejacket_by_George_Stubbs.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "two-women-window-murillo",
			"id": "two-women-window-murillo",
			"title": "Two Women at a Window",
			"artist": "Bartolomé Esteban Murillo",
			"year": 1655,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Bartolom%C3%A9_Esteban_Murillo%2C_Two_Women_at_a_Window%2C_c._1655-1660%2C_NGA_1185.jpg/3840px-Bartolom%C3%A9_Esteban_Murillo%2C_Two_Women_at_a_Window%2C_c._1655-1660%2C_NGA_1185.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bartolom%C3%A9_Esteban_Murillo,_Two_Women_at_a_Window,_c._1655-1660,_NGA_1185.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "madonna-meadow-bellini",
			"id": "madonna-meadow-bellini",
			"title": "Madonna of the Meadow",
			"artist": "Giovanni Bellini",
			"year": 1505,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Giovanni_bellini%2C_madonna_del_prato_01.jpg/3840px-Giovanni_bellini%2C_madonna_del_prato_01.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Giovanni_bellini,_madonna_del_prato_01.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "toilet-of-venus-boucher",
			"id": "toilet-of-venus-boucher",
			"title": "The Toilet of Venus",
			"artist": "François Boucher",
			"year": 1751,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Toilet_of_Venus%2C_by_Fran%C3%A7ois_Boucher.jpg/3840px-The_Toilet_of_Venus%2C_by_Fran%C3%A7ois_Boucher.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Toilet_of_Venus,_by_Fran%C3%A7ois_Boucher.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "dedham-vale",
			"id": "dedham-vale",
			"title": "View of Dedham Vale from East Bergholt",
			"artist": "John Constable",
			"year": 1815,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/John_Constable_-_View_of_Dedham_Vale_from_East_Bergholt.jpg/3840px-John_Constable_-_View_of_Dedham_Vale_from_East_Bergholt.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Constable_-_View_of_Dedham_Vale_from_East_Bergholt.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portinari-altarpiece",
			"id": "portinari-altarpiece",
			"title": "Portinari Altarpiece",
			"artist": "Hugo van der Goes",
			"year": 1478,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Hugo_van_der_Goes_-_Trittico_Portinari_-_Google_Art_Project.jpg/3840px-Hugo_van_der_Goes_-_Trittico_Portinari_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hugo_van_der_Goes_-_Trittico_Portinari_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "circe-invidiosa",
			"id": "circe-invidiosa",
			"title": "Circe Invidiosa",
			"artist": "John William Waterhouse",
			"year": 1892,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1d/J._W._Waterhouse_-_Circe_Invidiosa_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:J._W._Waterhouse_-_Circe_Invidiosa_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "twilight-wilderness",
			"id": "twilight-wilderness",
			"title": "Twilight in the Wilderness",
			"artist": "Frederic Edwin Church",
			"year": 1860,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg/3840px-Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frederic_Edwin_Church_-_Twilight_in_the_Wilderness.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pastoral-concert",
			"id": "pastoral-concert",
			"title": "Pastoral Concert",
			"artist": "Giorgione / Titian",
			"year": 1510,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Le_Concert_champ%C3%AAtre%2C_by_Titian%2C_from_C2RMF_retouched.jpg/3840px-Le_Concert_champ%C3%AAtre%2C_by_Titian%2C_from_C2RMF_retouched.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Le_Concert_champêtre,_by_Titian,_from_C2RMF_retouched.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "san-giobbe-bellini",
			"id": "san-giobbe-bellini",
			"title": "San Giobbe Altarpiece",
			"artist": "Giovanni Bellini",
			"year": 1487,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Accademia_-_Pala_di_San_Giobbe_by_Giovanni_Bellini.jpg/3840px-Accademia_-_Pala_di_San_Giobbe_by_Giovanni_Bellini.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Accademia_-_Pala_di_San_Giobbe_by_Giovanni_Bellini.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ossian-girodet",
			"id": "ossian-girodet",
			"title": "Ossian Receiving the Ghosts of the French Heroes",
			"artist": "Anne-Louis Girodet",
			"year": 1801,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Anne-Louis_Girodet-Trioson_001.jpg/2107px-Anne-Louis_Girodet-Trioson_001.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Anne-Louis_Girodet-Trioson_001.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boston-harbor-lane",
			"id": "boston-harbor-lane",
			"title": "Boston Harbor",
			"artist": "Fitz Henry Lane",
			"year": 1854,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Fitz_Henry_Lane_-_Boston_Harbor_-_Google_Art_Project.jpg/3840px-Fitz_Henry_Lane_-_Boston_Harbor_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fitz_Henry_Lane_-_Boston_Harbor_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "headless-horseman-quidor",
			"id": "headless-horseman-quidor",
			"title": "The Headless Horseman Pursuing Ichabod Crane",
			"artist": "John Quidor",
			"year": 1858,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/John_Quidor_-_The_Headless_Horseman_Pursuing_Ichabod_Crane_-_Google_Art_Project.jpg/3840px-John_Quidor_-_The_Headless_Horseman_Pursuing_Ichabod_Crane_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Quidor_-_The_Headless_Horseman_Pursuing_Ichabod_Crane_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "blind-leading-blind",
			"id": "blind-leading-blind",
			"title": "The Blind Leading the Blind",
			"artist": "Pieter Bruegel the Elder",
			"year": 1568,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pieter_Bruegel_the_Elder_%281568%29_The_Blind_Leading_the_Blind.jpg/2000px-Pieter_Bruegel_the_Elder_%281568%29_The_Blind_Leading_the_Blind.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_(1568)_The_Blind_Leading_the_Blind.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-pupils-labille",
			"id": "self-portrait-pupils-labille",
			"title": "Self-Portrait with Two Pupils",
			"artist": "Adélaïde Labille-Guiard",
			"year": 1785,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Ad%C3%A9la%C3%AFde_Labille-Guiard_-_Self-Portrait_with_Two_Pupils_-_The_Metropolitan_Museum_of_Art.jpg/3840px-Ad%C3%A9la%C3%AFde_Labille-Guiard_-_Self-Portrait_with_Two_Pupils_-_The_Metropolitan_Museum_of_Art.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Adélaïde_Labille-Guiard_-_Self-Portrait_with_Two_Pupils_-_The_Metropolitan_Museum_of_Art.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "autumn-carriera",
			"id": "autumn-carriera",
			"title": "Allegory of Autumn",
			"artist": "Rosalba Carriera",
			"year": 1725,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Bemberg_Fondation_Toulouse_-_L%27automne_-_Rosalba_Carriera_-_inv_1065.jpg/3840px-Bemberg_Fondation_Toulouse_-_L%27automne_-_Rosalba_Carriera_-_inv_1065.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bemberg_Fondation_Toulouse_-_L'automne_-_Rosalba_Carriera_-_inv_1065.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "haystacks-heade",
			"id": "haystacks-heade",
			"title": "Haystacks",
			"artist": "Martin Johnson Heade",
			"year": 1876,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Martin_Johnson_Heade_-_Haystacks.jpg/3200px-Martin_Johnson_Heade_-_Haystacks.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Martin_Johnson_Heade_-_Haystacks.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "orchids-hummingbirds-heade",
			"id": "orchids-hummingbirds-heade",
			"title": "Orchids, Passion Flowers and Hummingbirds",
			"artist": "Martin Johnson Heade",
			"year": 1880,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Martin_Johnson_Heade_001.jpg/2969px-Martin_Johnson_Heade_001.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Martin_Johnson_Heade_001.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "unexpected-visitors",
			"id": "unexpected-visitors",
			"title": "Unexpected Visitors",
			"artist": "Ilya Repin",
			"year": "c. 1884",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/16/Ilya_Repin_Unexpected_visitors.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ilya_Repin_Unexpected_visitors.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "still-life-lemons-zurbaran",
			"id": "still-life-lemons-zurbaran",
			"title": "Still Life with Lemons, Oranges and a Rose",
			"artist": "Francisco de Zurbarán",
			"year": 1633,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Francisco_de_Zurbar%C3%A1n_-_Still_Life_with_Lemons%2C_Oranges_and_a_Rose.jpg/3840px-Francisco_de_Zurbar%C3%A1n_-_Still_Life_with_Lemons%2C_Oranges_and_a_Rose.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francisco_de_Zurbar%C3%A1n_-_Still_Life_with_Lemons,_Oranges_and_a_Rose.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "thunder-storm-narragansett",
			"id": "thunder-storm-narragansett",
			"title": "Thunder Storm on Narragansett Bay",
			"artist": "Martin Johnson Heade",
			"year": 1868,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Martin_Johnson_Heade_-Thunder_Storm_on_Narragansett_Bay_ATC.jpg/3840px-Martin_Johnson_Heade_-Thunder_Storm_on_Narragansett_Bay_ATC.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Martin_Johnson_Heade_-Thunder_Storm_on_Narragansett_Bay_ATC.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "money-diggers",
			"id": "money-diggers",
			"title": "The Money Diggers",
			"artist": "John Quidor",
			"year": 1832,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/John_Quidor_-_The_Money_Diggers_-_Google_Art_Project.jpg/3840px-John_Quidor_-_The_Money_Diggers_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Quidor_-_The_Money_Diggers_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "travelers-mountains-streams",
			"id": "travelers-mountains-streams",
			"title": "Travelers Among Mountains and Streams",
			"artist": "Fan Kuan",
			"year": 1e3,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Fan_Kuan_-_Travelers_Among_Mountains_and_Streams_-_Google_Art_Project.jpg/3840px-Fan_Kuan_-_Travelers_Among_Mountains_and_Streams_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fan_Kuan_-_Travelers_Among_Mountains_and_Streams_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "early-spring-guo-xi",
			"id": "early-spring-guo-xi",
			"title": "Early Spring",
			"artist": "Guo Xi",
			"year": 1072,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Guo_Xi_-_Early_Spring_%28large%29.jpg/3840px-Guo_Xi_-_Early_Spring_%28large%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Guo_Xi_-_Early_Spring_(large).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "jahangir-sufi",
			"id": "jahangir-sufi",
			"title": "Jahangir Preferring a Sufi Shaikh to Kings",
			"artist": "Bichitr",
			"year": 1615,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Bichitr_-_Jahangir_Preferring_a_Sufi_Shaikh_to_Kings%2C_from_the_St._Petersburg_album_-_Google_Art_Project.jpg/3840px-Bichitr_-_Jahangir_Preferring_a_Sufi_Shaikh_to_Kings%2C_from_the_St._Petersburg_album_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bichitr_-_Jahangir_Preferring_a_Sufi_Shaikh_to_Kings,_from_the_St._Petersburg_album_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "large-bathers-renoir",
			"id": "large-bathers-renoir",
			"title": "The Large Bathers",
			"artist": "Pierre-Auguste Renoir",
			"year": "c. 1887",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pierre-Auguste_Renoir%2C_French_-_The_Large_Bathers_-_Google_Art_Project.jpg/3840px-Pierre-Auguste_Renoir%2C_French_-_The_Large_Bathers_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Pierre-Auguste_Renoir,_French_-_The_Large_Bathers_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "swan-princess",
			"id": "swan-princess",
			"title": "The Swan Princess",
			"artist": "Mikhail Vrubel",
			"year": 1900,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/80/Tsarevna-Lebed_by_Mikhail_Vrubel_%28brightened%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tsarevna-Lebed_by_Mikhail_Vrubel_(brightened).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "spring-alma-tadema",
			"id": "spring-alma-tadema",
			"title": "Spring",
			"artist": "Lawrence Alma-Tadema",
			"year": 1894,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Lawrence_Alma-Tadema_-_Spring_-_Google_Art_Project.jpg/3840px-Lawrence_Alma-Tadema_-_Spring_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Lawrence_Alma-Tadema_-_Spring_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "garden-hesperides",
			"id": "garden-hesperides",
			"title": "The Garden of the Hesperides",
			"artist": "Frederic Leighton",
			"year": 1892,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Frederic_Leighton_-_The_Garden_of_the_Hesperides%2C_1892.jpg/3840px-Frederic_Leighton_-_The_Garden_of_the_Hesperides%2C_1892.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frederic_Leighton_-_The_Garden_of_the_Hesperides,_1892.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "captive-andromache",
			"id": "captive-andromache",
			"title": "Captive Andromache",
			"artist": "Frederic Leighton",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Leighton_Captive_Andromache.jpg/3840px-Leighton_Captive_Andromache.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Leighton_Captive_Andromache.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-carriera",
			"id": "self-portrait-carriera",
			"title": "Self-Portrait",
			"artist": "Rosalba Carriera",
			"year": 1746,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/%28Venice%29_Rosalba_Carriera_-_Self-Portrait_-_Gallerie_Accademia.jpg/3840px-%28Venice%29_Rosalba_Carriera_-_Self-Portrait_-_Gallerie_Accademia.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:(Venice)_Rosalba_Carriera_-_Self-Portrait_-_Gallerie_Accademia.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "shono-hiroshige",
			"id": "shono-hiroshige",
			"title": "Shōno: Driving Rain",
			"artist": "Utagawa Hiroshige",
			"year": 1833,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Utagawa_Hiroshige_%28the_first%29_-_Shono_from_the_Fifty-three_Stations_on_Tokaido_Highway%2C_Hoeido_version_-_Google_Art_Project.jpg/3840px-Utagawa_Hiroshige_%28the_first%29_-_Shono_from_the_Fifty-three_Stations_on_Tokaido_Highway%2C_Hoeido_version_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Utagawa_Hiroshige_(the_first)_-_Shono_from_the_Fifty-three_Stations_on_Tokaido_Highway,_Hoeido_version_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fuchu-hiroshige",
			"id": "fuchu-hiroshige",
			"title": "Fuchū",
			"artist": "Utagawa Hiroshige",
			"year": 1833,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Ando_Hiroshige_-_Fuchu_-_Google_Art_Project.jpg/3840px-Ando_Hiroshige_-_Fuchu_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ando_Hiroshige_-_Fuchu_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kusatsu-hiroshige",
			"id": "kusatsu-hiroshige",
			"title": "Landscape at Kusatsu",
			"artist": "Utagawa Hiroshige",
			"year": 1833,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Ando_Hiroshige_-_Landscape_at_Kusatsu_-_Google_Art_Project.jpg/3840px-Ando_Hiroshige_-_Landscape_at_Kusatsu_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ando_Hiroshige_-_Landscape_at_Kusatsu_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "tsuchiyama-hiroshige",
			"id": "tsuchiyama-hiroshige",
			"title": "Tsuchiyama: Spring Rain",
			"artist": "Utagawa Hiroshige",
			"year": 1833,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Utagawa_Hiroshige_-_Tsuchiyama_-_Spring_Rain_%28Tsuchiyama_haru_no_ame%29_-_from_the_set_%27Fifty-three_Stations_of_the_Tokaid..._-_Google_Art_Project.jpg/3840px-Utagawa_Hiroshige_-_Tsuchiyama_-_Spring_Rain_%28Tsuchiyama_haru_no_ame%29_-_from_the_set_%27Fifty-three_Stations_of_the_Tokaid..._-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Utagawa_Hiroshige_-_Tsuchiyama_-_Spring_Rain_(Tsuchiyama_haru_no_ame)_-_from_the_set_'Fifty-three_Stations_of_the_Tokaid..._-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "autumn-moon-miho-kunisada",
			"id": "autumn-moon-miho-kunisada",
			"title": "Autumn Moon over Miho",
			"artist": "Utagawa Kunisada",
			"year": 1835,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Utagawa_Kunisada_-_Autumn_moon_over_Miho_-_Google_Art_Project.jpg/3508px-Utagawa_Kunisada_-_Autumn_moon_over_Miho_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Utagawa_Kunisada_-_Autumn_moon_over_Miho_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "carp-waterfall-eisen",
			"id": "carp-waterfall-eisen",
			"title": "Carp Ascending a Waterfall",
			"artist": "Keisai Eisen",
			"year": 1840,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Keisai_%28aka_Ikeda%29_Eisen_-_Carp_ascending_a_waterfall_-_Google_Art_Project.jpg/3840px-Keisai_%28aka_Ikeda%29_Eisen_-_Carp_ascending_a_waterfall_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Keisai_(aka_Ikeda)_Eisen_-_Carp_ascending_a_waterfall_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "studio-painter-courbet",
			"id": "studio-painter-courbet",
			"title": "The Painter's Studio",
			"artist": "Gustave Courbet",
			"year": 1855,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Courbet_LAtelier_du_peintre.jpg/3840px-Courbet_LAtelier_du_peintre.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Courbet_LAtelier_du_peintre.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "execution-maximilian",
			"id": "execution-maximilian",
			"title": "The Execution of Emperor Maximilian",
			"artist": "Édouard Manet",
			"year": 1868,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Edouard_Manet_022.jpg/3840px-Edouard_Manet_022.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_022.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "course-empire-destruction",
			"id": "course-empire-destruction",
			"title": "The Course of Empire: Destruction",
			"artist": "Thomas Cole",
			"year": 1836,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg/3840px-Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "course-empire-desolation",
			"id": "course-empire-desolation",
			"title": "The Course of Empire: Desolation",
			"artist": "Thomas Cole",
			"year": 1836,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg/3840px-Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "order-no-11",
			"id": "order-no-11",
			"title": "Order No. 11",
			"artist": "George Caleb Bingham",
			"year": 1868,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/George_Caleb_Bingham_-_Order_No._11_-_Google_Art_Project.jpg/3840px-George_Caleb_Bingham_-_Order_No._11_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_Order_No._11_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "duel-after-masked-ball",
			"id": "duel-after-masked-ball",
			"title": "Duel After a Masquerade Ball",
			"artist": "Jean-Léon Gérôme",
			"year": 1859,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Duel_After_a_Masquerade_Ball.jpg/3840px-Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Duel_After_a_Masquerade_Ball.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Duel_After_a_Masquerade_Ball.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "braces-rock",
			"id": "braces-rock",
			"title": "Brace's Rock",
			"artist": "Fitz Henry Lane",
			"year": 1864,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Fitz_Henry_Lane_-_Brace%27s_Rock.jpg/3840px-Fitz_Henry_Lane_-_Brace%27s_Rock.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Fitz_Henry_Lane_-_Brace%27s_Rock.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "poseuses",
			"id": "poseuses",
			"title": "Models (Poseuses)",
			"artist": "Georges Seurat",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Georges_Seurat_-_Models_%28Poseuses%29_-_BF811_-_Barnes_Foundation.jpg/3840px-Georges_Seurat_-_Models_%28Poseuses%29_-_BF811_-_Barnes_Foundation.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat_-_Models_(Poseuses)_-_BF811_-_Barnes_Foundation.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "morning-streltsy",
			"id": "morning-streltsy",
			"title": "Morning of the Execution of the Streltsy",
			"artist": "Vasily Surikov",
			"year": 1881,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Vasily_Surikov_-_%D0%A3%D1%82%D1%80%D0%BE_%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%BA%D0%B0%D0%B7%D0%BD%D0%B8_-_Google_Art_Project.jpg/3840px-Vasily_Surikov_-_%D0%A3%D1%82%D1%80%D0%BE_%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%BA%D0%B0%D0%B7%D0%BD%D0%B8_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vasily_Surikov_-_%D0%A3%D1%82%D1%80%D0%BE_%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%BA%D0%B0%D0%B7%D0%BD%D0%B8_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "knight-crossroads",
			"id": "knight-crossroads",
			"title": "Knight at the Crossroads",
			"artist": "Viktor Vasnetsov",
			"year": 1882,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Victor_Vasnetsov_-_Knight_at_the_Crossroads_-_Google_Art_Project.jpg/3840px-Victor_Vasnetsov_-_Knight_at_the_Crossroads_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Victor_Vasnetsov_-_Knight_at_the_Crossroads_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "gather-ye-rosebuds",
			"id": "gather-ye-rosebuds",
			"title": "Gather Ye Rosebuds While Ye May",
			"artist": "John William Waterhouse",
			"year": 1909,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Waterhouse-gather_ye_rosebuds-1909.jpg/3840px-Waterhouse-gather_ye_rosebuds-1909.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Waterhouse-gather_ye_rosebuds-1909.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "jahangir-madonna",
			"id": "jahangir-madonna",
			"title": "Jahangir Holding the Picture of Madonna",
			"artist": "Anonymous (Mughal)",
			"year": 1620,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Jahangir_holding_the_picture_of_Madonna_-_Google_Art_Project.jpg/3840px-Jahangir_holding_the_picture_of_Madonna_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jahangir_holding_the_picture_of_Madonna_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "three-crosses-rembrandt",
			"id": "three-crosses-rembrandt",
			"title": "The Three Crosses",
			"artist": "Rembrandt",
			"year": 1653,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Rembrandt_van_Rijn_-_Christ_Crucified_between_the_Two_Thieves_%28The_Three_Crosses%29_-_Google_Art_Project.jpg/3840px-Rembrandt_van_Rijn_-_Christ_Crucified_between_the_Two_Thieves_%28The_Three_Crosses%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_van_Rijn_-_Christ_Crucified_between_the_Two_Thieves_(The_Three_Crosses)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "madonna-munch",
			"id": "madonna-munch",
			"title": "Madonna",
			"artist": "Edvard Munch",
			"year": 1894,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Edvard_Munch_-_Madonna_-_Google_Art_Project.jpg/3840px-Edvard_Munch_-_Madonna_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Madonna_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "okazaki-hiroshige",
			"id": "okazaki-hiroshige",
			"title": "Okazaki: Yahagi Bridge",
			"artist": "Utagawa Hiroshige",
			"year": 1833,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Okazaki_LCCN2008660475.jpg/3840px-Okazaki_LCCN2008660475.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Okazaki_LCCN2008660475.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "akasaka-hiroshige",
			"id": "akasaka-hiroshige",
			"title": "Paulownia Plantation at Akasaka in Evening Rain",
			"artist": "Utagawa Hiroshige",
			"year": 1859,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Utagawa_Hiroshige_-_Paulownia_plantation_at_Akasaka_in_the_evening_rain_-_Google_Art_Project.jpg/3840px-Utagawa_Hiroshige_-_Paulownia_plantation_at_Akasaka_in_the_evening_rain_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Utagawa_Hiroshige_-_Paulownia_plantation_at_Akasaka_in_the_evening_rain_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "summer-carriera",
			"id": "summer-carriera",
			"title": "Allegory of Summer",
			"artist": "Rosalba Carriera",
			"year": 1725,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Bemberg_Fondation_Toulouse_-_L%27%C3%A9t%C3%A9_-_Rosalba_Carriera_-_inv_1064.jpg/3840px-Bemberg_Fondation_Toulouse_-_L%27%C3%A9t%C3%A9_-_Rosalba_Carriera_-_inv_1064.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Bemberg_Fondation_Toulouse_-_L'été_-_Rosalba_Carriera_-_inv_1064.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "man-with-pink-memling",
			"id": "man-with-pink-memling",
			"title": "Portrait of a Man with a Pink",
			"artist": "Hans Memling",
			"year": 1475,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Hans_Memling_-_Portrait_of_a_Man_with_a_Pink_-_Google_Art_Project.jpg/3535px-Hans_Memling_-_Portrait_of_a_Man_with_a_Pink_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hans_Memling_-_Portrait_of_a_Man_with_a_Pink_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "man-of-sorrows-memling",
			"id": "man-of-sorrows-memling",
			"title": "The Man of Sorrows Blessing",
			"artist": "Hans Memling",
			"year": 1485,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Hans_Memling_-_The_Man_of_Sorrows_Blessing_-_Google_Art_Project.jpg/3840px-Hans_Memling_-_The_Man_of_Sorrows_Blessing_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hans_Memling_-_The_Man_of_Sorrows_Blessing_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "john-baptist-triptych-memling",
			"id": "john-baptist-triptych-memling",
			"title": "Small Triptych of St. John the Baptist",
			"artist": "Hans Memling",
			"year": 1485,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Hans_Memling_-_Small_Triptych_of_St._John_the_Baptist_-_Google_Art_Project.jpg/3840px-Hans_Memling_-_Small_Triptych_of_St._John_the_Baptist_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Hans_Memling_-_Small_Triptych_of_St._John_the_Baptist_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "radha-krishna-boat",
			"id": "radha-krishna-boat",
			"title": "Radha and Krishna in the Boat of Love",
			"artist": "Anonymous (Kishangarh / Rajput)",
			"year": 1755,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Radha_and_Krishna_in_the_boat_of_love_-_Google_Art_Project.jpg/3840px-Radha_and_Krishna_in_the_boat_of_love_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Radha_and_Krishna_in_the_boat_of_love_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "irises-yatsuhashi-korin",
			"id": "irises-yatsuhashi-korin",
			"title": "Irises at Yatsuhashi (Eight Bridges)",
			"artist": "Ogata Kōrin",
			"year": 1709,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/%E5%85%AB%E6%A9%8B%E5%9B%B3%E5%B1%8F%E9%A2%A8_-Irises_at_Yatsuhashi_%28Eight_Bridges%29_MET_DT230.jpg/3811px-%E5%85%AB%E6%A9%8B%E5%9B%B3%E5%B1%8F%E9%A2%A8_-Irises_at_Yatsuhashi_%28Eight_Bridges%29_MET_DT230.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:八橋図屏風_-Irises_at_Yatsuhashi_(Eight_Bridges)_MET_DT230.jpg",
			"license": "CC0 (MET open access / faithful reproduction of PD artwork)"
		},
		{
			"slug": "miracle-slave-tintoretto",
			"id": "miracle-slave-tintoretto",
			"title": "The Miracle of the Slave",
			"artist": "Tintoretto",
			"year": 1548,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Accademia_-_Miracle_of_the_Slave_by_Tintoretto.jpg/3840px-Accademia_-_Miracle_of_the_Slave_by_Tintoretto.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Accademia_-_Miracle_of_the_Slave_by_Tintoretto.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "flood-port-marly",
			"id": "flood-port-marly",
			"title": "Boat in the Flood at Port-Marly",
			"artist": "Alfred Sisley",
			"year": 1876,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Alfred_Sisley_-_Boat_in_the_Flood_at_Port_Marly_-_Google_Art_Project.jpg/3840px-Alfred_Sisley_-_Boat_in_the_Flood_at_Port_Marly_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alfred_Sisley_-_Boat_in_the_Flood_at_Port_Marly_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "brig-mercury-aivazovsky",
			"id": "brig-mercury-aivazovsky",
			"title": "Brig Mercury Attacked by Two Turkish Ships",
			"artist": "Ivan Aivazovsky",
			"year": 1892,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Aivazovsky%2C_Brig_Mercury_Attacked_by_Two_Turkish_Ships_1892.jpg/3840px-Aivazovsky%2C_Brig_Mercury_Attacked_by_Two_Turkish_Ships_1892.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Aivazovsky,_Brig_Mercury_Attacked_by_Two_Turkish_Ships_1892.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "anxiety-munch",
			"id": "anxiety-munch",
			"title": "Anxiety",
			"artist": "Edvard Munch",
			"year": 1894,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg/3840px-Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Anxiety_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "yoshitsune-falls",
			"id": "yoshitsune-falls",
			"title": "The Yoshitsune Horse-Washing Falls at Yoshino",
			"artist": "Katsushika Hokusai",
			"year": 1833,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Yoshitsune_Horse-Washing_Falls_at_Yoshino%2C_Izumi_Province_LACMA_M.2011.135.5.jpg/3840px-The_Yoshitsune_Horse-Washing_Falls_at_Yoshino%2C_Izumi_Province_LACMA_M.2011.135.5.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Yoshitsune_Horse-Washing_Falls_at_Yoshino,_Izumi_Province_LACMA_M.2011.135.5.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hamzanama-page",
			"id": "hamzanama-page",
			"title": "A Page from the Hamzanama",
			"artist": "Mughal school",
			"year": 1570,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Mughal_-_A_page_of_the_Dastan-i_Amir_Hamza_%28Hamzanama%29_-_Google_Art_Project.jpg/3840px-Mughal_-_A_page_of_the_Dastan-i_Amir_Hamza_%28Hamzanama%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mughal_-_A_page_of_the_Dastan-i_Amir_Hamza_(Hamzanama)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boulevard-montmartre-night",
			"id": "boulevard-montmartre-night",
			"title": "The Boulevard Montmartre at Night",
			"artist": "Camille Pissarro",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Camille_Pissarro%2C_The_Boulevard_Montmartre_at_Night%2C_1897.jpg/3840px-Camille_Pissarro%2C_The_Boulevard_Montmartre_at_Night%2C_1897.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Camille_Pissarro,_The_Boulevard_Montmartre_at_Night,_1897.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "flood-port-marly-nga",
			"id": "flood-port-marly-nga",
			"title": "Flood at Port-Marly",
			"artist": "Alfred Sisley",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Alfred_Sisley%2C_Flood_at_Port-Marly%2C_1872%2C_NGA_66436.jpg/3840px-Alfred_Sisley%2C_Flood_at_Port-Marly%2C_1872%2C_NGA_66436.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Alfred_Sisley,_Flood_at_Port-Marly,_1872,_NGA_66436.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "annunciation-simone-martini",
			"id": "annunciation-simone-martini",
			"title": "The Annunciation",
			"artist": "Simone Martini and Lippo Memmi",
			"year": 1333,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Simone_Martini_and_Lippo_Memmi_-_The_Annunciation_and_Two_Saints_-_WGA15010.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Simone_Martini_and_Lippo_Memmi_-_The_Annunciation_and_Two_Saints_-_WGA15010.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "triumph-galatea",
			"id": "triumph-galatea",
			"title": "The Triumph of Galatea",
			"artist": "Raphael",
			"year": "c. 1512",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Raphael%27s_Triumph_of_Galatea_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Raphael's_Triumph_of_Galatea_01.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "chalk-cliffs-rugen",
			"id": "chalk-cliffs-rugen",
			"title": "Chalk Cliffs on Rügen",
			"artist": "Caspar David Friedrich",
			"year": 1818,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/79/Friedrich%2C_Caspar_David_-_Kreidefelsen_auf_R%C3%BCgen.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Friedrich,_Caspar_David_-_Kreidefelsen_auf_Rügen.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "rue-transnonain",
			"id": "rue-transnonain",
			"title": "Rue Transnonain",
			"artist": "Honoré Daumier",
			"year": 1834,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Honor%C3%A9_Daumier%2C_Rue_Transnonain%2C_le_15_avril_1834%2C_1834%2C_NGA_6133.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Honoré_Daumier,_Rue_Transnonain,_le_15_avril_1834,_1834,_NGA_6133.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "boulevard-montmartre-pissarro",
			"id": "boulevard-montmartre-pissarro",
			"title": "Boulevard Montmartre, Spring",
			"artist": "Camille Pissarro",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Camille_Pissarro_-_Boulevard_Montmartre%2C_Spring_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Camille_Pissarro_-_Boulevard_Montmartre,_Spring_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "green-wheat-field",
			"id": "green-wheat-field",
			"title": "Green Wheat Field",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Vincent_van_Gogh_-_Green_Field_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Green_Field_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "summer-day-morisot",
			"id": "summer-day-morisot",
			"title": "A Summer's Day",
			"artist": "Berthe Morisot",
			"year": 1879,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/34/Morisot_-_a-summer-s-day.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Morisot_-_a-summer-s-day.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "lady-writing-letter-maid",
			"id": "lady-writing-letter-maid",
			"title": "Lady Writing a Letter with Her Maid",
			"artist": "Johannes Vermeer",
			"year": "c. 1670",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/20/Johannes_Vermeer_-_Lady_Writing_a_Letter_with_Her_Maid_-_WGA24696.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Lady_Writing_a_Letter_with_Her_Maid_-_WGA24696.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "source-ingres",
			"id": "source-ingres",
			"title": "The Source",
			"artist": "Jean-Auguste-Dominique Ingres",
			"year": 1856,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/46/Jean_Auguste_Dominique_Ingres_-_The_Spring_-_Google_Art_Project_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean_Auguste_Dominique_Ingres_-_The_Spring_-_Google_Art_Project_2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "greece-missolonghi",
			"id": "greece-missolonghi",
			"title": "Greece on the Ruins of Missolonghi",
			"artist": "Eugène Delacroix",
			"year": 1826,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/67/Eug%C3%A8ne_Delacroix_-_La_Gr%C3%A8ce_sur_les_ruines_de_Missolonghi%2C_1826.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Eugène_Delacroix_-_La_Grèce_sur_les_ruines_de_Missolonghi,_1826.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "forge-vulcan",
			"id": "forge-vulcan",
			"title": "The Forge of Vulcan",
			"artist": "Diego Velázquez",
			"year": 1630,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Diego_Vel%C3%A1zquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Diego_Velázquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portrait-dr-gachet",
			"id": "portrait-dr-gachet",
			"title": "Portrait of Dr. Gachet",
			"artist": "Vincent van Gogh",
			"year": 1890,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vincent_van_Gogh_-_Dr_Paul_Gachet_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Dr_Paul_Gachet_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "chess-game-anguissola",
			"id": "chess-game-anguissola",
			"title": "The Chess Game",
			"artist": "Sofonisba Anguissola",
			"year": 1555,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/The_Chess_Game_%28Sofonisba_Anguissola%29_1555_%284096x3236px%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "paul-revere-copley",
			"id": "paul-revere-copley",
			"title": "Paul Revere",
			"artist": "John Singleton Copley",
			"year": 1768,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b7/John_Singleton_Copley_-_Paul_Revere_-_WGA5216.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_Singleton_Copley_-_Paul_Revere_-_WGA5216.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bacchus-ariadne-tiepolo",
			"id": "bacchus-ariadne-tiepolo",
			"title": "Bacchus and Ariadne",
			"artist": "Giovanni Battista Tiepolo",
			"year": "c. 1743",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/55/Giovanni_Battista_Tiepolo%2C_Bacchus_and_Ariadne%2C_c._1743-1745%2C_NGA_46060.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Giovanni_Battista_Tiepolo,_Bacchus_and_Ariadne,_c._1743-1745,_NGA_46060.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hummingbird-passionflowers",
			"id": "hummingbird-passionflowers",
			"title": "Hummingbird and Passionflowers",
			"artist": "Martin Johnson Heade",
			"year": "c. 1875",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/03/Heade_Martin_Johnson_Hummingbird_And_Passionflowers.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Heade_Martin_Johnson_Hummingbird_And_Passionflowers.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "chasm-of-the-colorado",
			"id": "chasm-of-the-colorado",
			"title": "The Chasm of the Colorado",
			"artist": "Thomas Moran",
			"year": 1873,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Thomas_Moran_-_The_Chasm_of_the_Colorado_-_L.1968.84.2_-_Smithsonian_American_Art_Museum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_The_Chasm_of_the_Colorado_-_L.1968.84.2_-_Smithsonian_American_Art_Museum.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-lute-artemisia",
			"id": "self-portrait-lute-artemisia",
			"title": "Self-Portrait as a Lute Player",
			"artist": "Artemisia Gentileschi",
			"year": "c. 1615",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Artemisia_Gentileschi_-_Self-Portrait_as_a_Lute_Player.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Artemisia_Gentileschi_-_Self-Portrait_as_a_Lute_Player.JPG",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "apotheosis-homer",
			"id": "apotheosis-homer",
			"title": "The Apotheosis of Homer",
			"artist": "Jean-Auguste-Dominique Ingres",
			"year": 1827,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Jean_Auguste_Dominique_Ingres_-_The_Apotheosis_of_Homer_-_WGA11849.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean_Auguste_Dominique_Ingres_-_The_Apotheosis_of_Homer_-_WGA11849.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "entry-crusaders",
			"id": "entry-crusaders",
			"title": "Entry of the Crusaders into Constantinople",
			"artist": "Eugène Delacroix",
			"year": 1840,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Eug%C3%A8ne_Delacroix_-_The_Entry_of_the_Crusaders_into_Constantinople_-_WGA6202.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Eugène_Delacroix_-_The_Entry_of_the_Crusaders_into_Constantinople_-_WGA6202.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portrait-kleptomaniac",
			"id": "portrait-kleptomaniac",
			"title": "Portrait of a Kleptomaniac",
			"artist": "Théodore Géricault",
			"year": "c. 1822",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/2/25/Th%C3%A9odore_G%C3%A9ricault_-_Portrait_of_a_Kleptomaniac_-_WGA08636.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Théodore_Géricault_-_Portrait_of_a_Kleptomaniac_-_WGA08636.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "winter-landscape-friedrich",
			"id": "winter-landscape-friedrich",
			"title": "Winter Landscape",
			"artist": "Caspar David Friedrich",
			"year": "c. 1811",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/be/Caspar_David_Friedrich_-_Winter_Landscape_with_Church_-_WGA08245.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Winter_Landscape_with_Church_-_WGA08245.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "fox-hunt-homer",
			"id": "fox-hunt-homer",
			"title": "The Fox Hunt",
			"artist": "Winslow Homer",
			"year": 1893,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/Winslow_Homer_-_Fox_Hunt.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_Fox_Hunt.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "little-girl-blue-armchair",
			"id": "little-girl-blue-armchair",
			"title": "Little Girl in a Blue Armchair",
			"artist": "Mary Cassatt",
			"year": 1878,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Cassat_-_Blue_Armchair_NGA.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cassat_-_Blue_Armchair_NGA.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "roses-heliogabalus",
			"id": "roses-heliogabalus",
			"title": "The Roses of Heliogabalus",
			"artist": "Lawrence Alma-Tadema",
			"year": 1888,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/33/The_Roses_of_Heliogabalus.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Roses_of_Heliogabalus.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ulysses-sirens",
			"id": "ulysses-sirens",
			"title": "Ulysses and the Sirens",
			"artist": "John William Waterhouse",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/John_William_Waterhouse_-_Ulysses_and_the_Sirens_%281891%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Ulysses_and_the_Sirens_(1891).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "barge-haulers",
			"id": "barge-haulers",
			"title": "Barge Haulers on the Volga",
			"artist": "Ilya Repin",
			"year": 1873,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ilya_Repin_-_Barge_Haulers_on_the_Volga_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ilya_Repin_-_Barge_Haulers_on_the_Volga_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "alyonushka",
			"id": "alyonushka",
			"title": "Alyonushka",
			"artist": "Viktor Vasnetsov",
			"year": 1881,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Vasnetsov_Alenushka.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vasnetsov_Alenushka.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "among-waves-aivazovsky",
			"id": "among-waves-aivazovsky",
			"title": "Among the Waves",
			"artist": "Ivan Aivazovsky",
			"year": 1898,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ivan_Konstantinovich_Aivazovsky_-_Among_the_Waves%2C_1898.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ivan_Konstantinovich_Aivazovsky_-_Among_the_Waves,_1898.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "doni-tondo",
			"id": "doni-tondo",
			"title": "Doni Tondo",
			"artist": "Michelangelo",
			"year": 1507,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Tondo_Doni%2C_por_Miguel_%C3%81ngel.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Tondo_Doni,_por_Miguel_Ángel.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "transfiguration-raphael",
			"id": "transfiguration-raphael",
			"title": "The Transfiguration",
			"artist": "Raphael",
			"year": 1520,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/51/Transfiguration_Raphael.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Transfiguration_Raphael.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "portrait-carthusian",
			"id": "portrait-carthusian",
			"title": "Portrait of a Carthusian",
			"artist": "Petrus Christus",
			"year": 1446,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Christus_carthusian.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Christus_carthusian.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "sleep-endymion-girodet",
			"id": "sleep-endymion-girodet",
			"title": "The Sleep of Endymion",
			"artist": "Anne-Louis Girodet",
			"year": 1791,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/The_Sleep_of_Endymion_-_Girodet_%28Louvre_INV_4935%29.jpg/3840px-The_Sleep_of_Endymion_-_Girodet_%28Louvre_INV_4935%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Sleep_of_Endymion_-_Girodet_(Louvre_INV_4935).jpg",
			"license": "CC0 (faithful reproduction of PD artwork)"
		},
		{
			"slug": "funeral-atala-girodet",
			"id": "funeral-atala-girodet",
			"title": "The Entombment of Atala",
			"artist": "Anne-Louis Girodet",
			"year": 1808,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Atala_au_tombeau_-_Anne-Louis_Girodet_-_Mus%C3%A9e_du_Louvre_Peintures_INV_4958%2C_louvre_1.jpg/3840px-Atala_au_tombeau_-_Anne-Louis_Girodet_-_Mus%C3%A9e_du_Louvre_Peintures_INV_4958%2C_louvre_1.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Atala_au_tombeau_-_Anne-Louis_Girodet_-_Musée_du_Louvre_Peintures_INV_4958,_louvre_1.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pearl-necklace-loge-cassatt",
			"id": "pearl-necklace-loge-cassatt",
			"title": "Woman with a Pearl Necklace in a Loge",
			"artist": "Mary Cassatt",
			"year": 1879,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Mary_Stevenson_Cassatt%2C_American_-_Woman_with_a_Pearl_Necklace_in_a_Loge_-_Google_Art_Project.jpg/3840px-Mary_Stevenson_Cassatt%2C_American_-_Woman_with_a_Pearl_Necklace_in_a_Loge_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mary_Stevenson_Cassatt,_American_-_Woman_with_a_Pearl_Necklace_in_a_Loge_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "garden-bathtub-kunisada",
			"id": "garden-bathtub-kunisada",
			"title": "The Garden Bathtub",
			"artist": "Utagawa Kunisada",
			"year": 1825,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Utagawa_Kunisada_-_The_garden_bathtub_-_Google_Art_Project.jpg/3508px-Utagawa_Kunisada_-_The_garden_bathtub_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Utagawa_Kunisada_-_The_garden_bathtub_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hundred-guilder-rembrandt",
			"id": "hundred-guilder-rembrandt",
			"title": "Christ Preaching (The Hundred Guilder Print)",
			"artist": "Rembrandt",
			"year": 1649,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Rembrandt_van_Rijn_-_Christ_Preaching_%28The_Hundred_Guilder_Print%29_-_Google_Art_Project.jpg/3840px-Rembrandt_van_Rijn_-_Christ_Preaching_%28The_Hundred_Guilder_Print%29_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Rembrandt_van_Rijn_-_Christ_Preaching_(The_Hundred_Guilder_Print)_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "musume-eisen",
			"id": "musume-eisen",
			"title": "Musume Gako",
			"artist": "Keisai Eisen",
			"year": 1835,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Musumegako-Keisai_Eisen-edoperiod-googleartproject.jpg/2076px-Musumegako-Keisai_Eisen-edoperiod-googleartproject.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Musumegako-Keisai_Eisen-edoperiod-googleartproject.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "ryogoku-bridge-eisen",
			"id": "ryogoku-bridge-eisen",
			"title": "Enjoying the Evening Cool at Ryōgoku Bridge",
			"artist": "Keisai Eisen",
			"year": 1830,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ukie_Edo_Ryogokubashi_noryo_no_zu-Keisai_Eisen-edoperiod.jpg/1838px-Ukie_Edo_Ryogokubashi_noryo_no_zu-Keisai_Eisen-edoperiod.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ukie_Edo_Ryogokubashi_noryo_no_zu-Keisai_Eisen-edoperiod.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "expulsion-eden-cole",
			"id": "expulsion-eden-cole",
			"title": "Expulsion from the Garden of Eden",
			"artist": "Thomas Cole",
			"year": 1828,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Cole_Thomas_Expulsion_from_the_Garden_of_Eden_1828.jpg/3840px-Cole_Thomas_Expulsion_from_the_Garden_of_Eden_1828.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_Expulsion_from_the_Garden_of_Eden_1828.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "poseuses-seurat",
			"id": "poseuses-seurat",
			"title": "Models (Poseuses)",
			"artist": "Georges Seurat",
			"year": "c. 1888",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Georges_Seurat_024.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat_024.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "hamzanama-qasam",
			"id": "hamzanama-qasam",
			"title": "Qasam al-Abbas Arrives from Mecca and Crushes Tahmasp with a Mace",
			"artist": "Mahesha (attributed)",
			"year": 1570,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Attributed_to_Mahesha%2C_Indian%2C_active_c._1570_-_1590_-_Qasam_al-Abbas_Arrives_from_Mecca_and_Crushes_Tahmasp_with_a_Mace_-_Google_Art_Project.jpg/3840px-Attributed_to_Mahesha%2C_Indian%2C_active_c._1570_-_1590_-_Qasam_al-Abbas_Arrives_from_Mecca_and_Crushes_Tahmasp_with_a_Mace_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Attributed_to_Mahesha,_Indian,_active_c._1570_-_1590_-_Qasam_al-Abbas_Arrives_from_Mecca_and_Crushes_Tahmasp_with_a_Mace_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "miya-hiroshige",
			"id": "miya-hiroshige",
			"title": "Miya: Festival at Atsuta Shrine",
			"artist": "Utagawa Hiroshige",
			"year": 1834,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E5%AE%AE_%E7%86%B1%E7%94%B0%E7%A5%9E%E4%BA%8B-Miya%2C_Atsuta_Shin_Ji_MET_DP122222.jpg/3840px-%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E5%AE%AE_%E7%86%B1%E7%94%B0%E7%A5%9E%E4%BA%8B-Miya%2C_Atsuta_Shin_Ji_MET_DP122222.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E5%AE%AE_%E7%86%B1%E7%94%B0%E7%A5%9E%E4%BA%8B-Miya,_Atsuta_Shin_Ji_MET_DP122222.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "storm-black-sea-aivazovsky",
			"id": "storm-black-sea-aivazovsky",
			"title": "Storm over the Black Sea",
			"artist": "Ivan Aivazovsky",
			"year": 1893,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Storm_over_the_Black_Sea_by_Aivazovsky%2C_1893.png/3840px-Storm_over_the_Black_Sea_by_Aivazovsky%2C_1893.png",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Storm_over_the_Black_Sea_by_Aivazovsky,_1893.png",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "souvenir-mortefontaine",
			"id": "souvenir-mortefontaine",
			"title": "Souvenir of Mortefontaine",
			"artist": "Jean-Baptiste-Camille Corot",
			"year": 1864,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Souvenir_de_Mortefontaine_-_Jean-Baptiste_Camille_Corot_-_Mus%C3%A9e_du_Louvre_Peintures_MI_692_bis_-_photo_2.jpg/3840px-Souvenir_de_Mortefontaine_-_Jean-Baptiste_Camille_Corot_-_Mus%C3%A9e_du_Louvre_Peintures_MI_692_bis_-_photo_2.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Souvenir_de_Mortefontaine_-_Jean-Baptiste_Camille_Corot_-_Musée_du_Louvre_Peintures_MI_692_bis_-_photo_2.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "banquet-st-george-hals",
			"id": "banquet-st-george-hals",
			"title": "Banquet of the Officers of the St George Civic Guard",
			"artist": "Frans Hals",
			"year": 1616,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Frans_Hals_-_Banket_van_de_officieren_van_de_Sint-Joris-Doelen.jpg/1920px-Frans_Hals_-_Banket_van_de_officieren_van_de_Sint-Joris-Doelen.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Banket_van_de_officieren_van_de_Sint-Joris-Doelen.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "napoleon-studying",
			"id": "napoleon-studying",
			"title": "The Emperor Napoleon in His Study at the Tuileries",
			"artist": "Jacques-Louis David",
			"year": 1812,
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/3840px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "death-of-general-wolfe",
			"id": "death-of-general-wolfe",
			"title": "The Death of General Wolfe",
			"artist": "Benjamin West",
			"year": 1770,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Benjamin_West_005.jpg/3840px-Benjamin_West_005.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Benjamin_West_005.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pierrot-watteau",
			"id": "pierrot-watteau",
			"title": "Pierrot (Gilles)",
			"artist": "Jean-Antoine Watteau",
			"year": "c. 1719",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Jean-Antoine_Watteau_-_Pierrot%2C_dit_autrefois_Gilles.jpg/1920px-Jean-Antoine_Watteau_-_Pierrot%2C_dit_autrefois_Gilles.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean-Antoine_Watteau_-_Pierrot,_dit_autrefois_Gilles.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "kambara-hiroshige",
			"id": "kambara-hiroshige",
			"title": "Evening Snow at Kanbara",
			"artist": "Utagawa Hiroshige",
			"year": "c. 1833",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E8%92%B2%E5%8E%9F_%E5%A4%9C%E3%81%AE%E9%9B%AA-Evening_Snow_at_Kanbara%2C_from_the_series_%22Fifty-three_Stations_of_the_T%C5%8Dkaid%C5%8D%22_MET_DP109333.jpg/3840px-%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E8%92%B2%E5%8E%9F_%E5%A4%9C%E3%81%AE%E9%9B%AA-Evening_Snow_at_Kanbara%2C_from_the_series_%22Fifty-three_Stations_of_the_T%C5%8Dkaid%C5%8D%22_MET_DP109333.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:東海道五十三次之内_蒲原_夜の雪-Evening_Snow_at_Kanbara,_from_the_series_\"Fifty-three_Stations_of_the_Tōkaidō\"_MET_DP109333.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "la-grenouillere",
			"id": "la-grenouillere",
			"title": "La Grenouillère",
			"artist": "Pierre-Auguste Renoir",
			"year": 1869,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Auguste_Renoir_-_La_Grenouill%C3%A8re.jpg/3840px-Auguste_Renoir_-_La_Grenouill%C3%A8re.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Auguste_Renoir_-_La_Grenouillère.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "circus-sideshow",
			"id": "circus-sideshow",
			"title": "Circus Sideshow (Parade de cirque)",
			"artist": "Georges Seurat",
			"year": "1887–88",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Georges_Seurat%2C_Circus_Sideshow%2C_1887%E2%80%9388.jpg/3840px-Georges_Seurat%2C_Circus_Sideshow%2C_1887%E2%80%9388.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Georges_Seurat,_Circus_Sideshow,_1887–88.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "marriage-settlement-hogarth",
			"id": "marriage-settlement-hogarth",
			"title": "Marriage A-la-Mode: The Marriage Settlement",
			"artist": "William Hogarth",
			"year": "c. 1743",
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Marriage_A-la-Mode_1%2C_The_Marriage_Settlement_-_William_Hogarth.jpg/3840px-Marriage_A-la-Mode_1%2C_The_Marriage_Settlement_-_William_Hogarth.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Marriage_A-la-Mode_1,_The_Marriage_Settlement_-_William_Hogarth.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "nevermore-gauguin",
			"id": "nevermore-gauguin",
			"title": "Nevermore",
			"artist": "Paul Gauguin",
			"year": 1897,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Paul_Gauguin_091.jpg/3840px-Paul_Gauguin_091.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Gauguin_091.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "choosing-watts",
			"id": "choosing-watts",
			"title": "Choosing",
			"artist": "George Frederic Watts",
			"year": "c. 1864",
			"orientation": "portrait",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Dame_%28Alice%29_Ellen_Terry_%28%27Choosing%27%29_by_George_Frederic_Watts.jpg/3840px-Dame_%28Alice%29_Ellen_Terry_%28%27Choosing%27%29_by_George_Frederic_Watts.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Dame_(Alice)_Ellen_Terry_('Choosing')_by_George_Frederic_Watts.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "wheat-field-cypresses",
			"id": "wheat-field-cypresses",
			"title": "Wheat Field with Cypresses",
			"artist": "Vincent van Gogh",
			"year": 1889,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Wheat-Field-with-Cypresses-%281889%29-Vincent-van-Gogh-Met.jpg/3840px-Wheat-Field-with-Cypresses-%281889%29-Vincent-van-Gogh-Met.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Wheat-Field-with-Cypresses-(1889)-Vincent-van-Gogh-Met.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "tahitian-women",
			"id": "tahitian-women",
			"title": "Tahitian Women on the Beach",
			"artist": "Paul Gauguin",
			"year": 1891,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Paul_Gauguin_056.jpg/3840px-Paul_Gauguin_056.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Gauguin_056.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "qingming-scroll",
			"id": "qingming-scroll",
			"title": "Along the River During the Qingming Festival (Qing Court Version)",
			"artist": "Qing court artists (after Zhang Zeduan)",
			"year": 1736,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg/3840px-Along_the_River_During_the_Qingming_Festival_%28Qing_Court_Version%29.jpg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Along_the_River_During_the_Qingming_Festival_(Qing_Court_Version).jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "valley-of-the-yosemite",
			"id": "valley-of-the-yosemite",
			"title": "Valley of the Yosemite",
			"artist": "Albert Bierstadt",
			"year": 1868,
			"orientation": "landscape",
			"source_image_url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Valley_of_the_Yosemite_by_Albert_Bierstadt_1868.jpeg/3840px-Valley_of_the_Yosemite_by_Albert_Bierstadt_1868.jpeg",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Valley_of_the_Yosemite_by_Albert_Bierstadt_1868.jpeg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "entrance-grand-canal",
			"id": "entrance-grand-canal",
			"title": "Entrance to the Grand Canal, Venice",
			"artist": "Canaletto",
			"year": "c. 1730",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Canaletto_Entrance_to_the_Grand_Canal_Venice.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Canaletto_Entrance_to_the_Grand_Canal_Venice.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "santa-maria-salute-guardi",
			"id": "santa-maria-salute-guardi",
			"title": "Santa Maria della Salute",
			"artist": "Francesco Guardi",
			"year": "c. 1770",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Francesco_Guardi_-_Santa_Maria_della_Salute_%28c._1770%29_-_NGA.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Francesco_Guardi_-_Santa_Maria_della_Salute_(c._1770)_-_NGA.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "bridge-villeneuve-sisley",
			"id": "bridge-villeneuve-sisley",
			"title": "The Bridge at Villeneuve-la-Garenne",
			"artist": "Alfred Sisley",
			"year": 1872,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/4/45/The_Bridge_at_Villeneuve-la-Garenne_MET_DT1040.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:The_Bridge_at_Villeneuve-la-Garenne_MET_DT1040.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "allegory-good-government",
			"id": "allegory-good-government",
			"title": "Allegory of Good Government",
			"artist": "Ambrogio Lorenzetti",
			"year": "c. 1338",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Ambrogio_Lorenzetti_-_Allegory_of_Good_Government_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Ambrogio_Lorenzetti_-_Allegory_of_Good_Government_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "turkish-bath-ingres",
			"id": "turkish-bath-ingres",
			"title": "The Turkish Bath",
			"artist": "Jean-Auguste-Dominique Ingres",
			"year": 1862,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Jean_Auguste_Dominique_Ingres_-_The_Turkish_Bath_-_WGA11855.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Jean_Auguste_Dominique_Ingres_-_The_Turkish_Bath_-_WGA11855.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "christ-crucified-velazquez",
			"id": "christ-crucified-velazquez",
			"title": "Christ Crucified",
			"artist": "Diego Velázquez",
			"year": 1632,
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/a/af/Diego_Vel%C3%A1zquez_-_Christ_on_the_Cross_-_WGA24389.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Diego_Velázquez_-_Christ_on_the_Cross_-_WGA24389.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "concert-vermeer",
			"id": "concert-vermeer",
			"title": "The Concert",
			"artist": "Johannes Vermeer",
			"year": "c. 1664",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Vermeer_The_Concert.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vermeer_The_Concert.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "girl-with-flute",
			"id": "girl-with-flute",
			"title": "Girl with a Flute",
			"artist": "Johannes Vermeer",
			"year": "c. 1665",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Johannes_Vermeer_-_Young_Girl_with_a_Flute_-_WGA24683.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Young_Girl_with_a_Flute_-_WGA24683.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "venus-helen-kauffman",
			"id": "venus-helen-kauffman",
			"title": "Venus Induces Helen to Fall in Love with Paris",
			"artist": "Angelica Kauffman",
			"year": 1790,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/57/Angelica_Kauffmann_-_Venus_Induces_Helen_to_Fall_in_Love_with_Paris_-_WGA12099.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Angelica_Kauffmann_-_Venus_Induces_Helen_to_Fall_in_Love_with_Paris_-_WGA12099.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "county-election",
			"id": "county-election",
			"title": "The County Election",
			"artist": "George Caleb Bingham",
			"year": 1852,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/0/00/George_Caleb_Bingham_-_The_County_Election_-_44-2001_-_Saint_Louis_Art_Museum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election_-_44-2001_-_Saint_Louis_Art_Museum.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "demon-seated",
			"id": "demon-seated",
			"title": "The Demon Seated",
			"artist": "Mikhail Vrubel",
			"year": 1890,
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Vrubel_Demon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Vrubel_Demon.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "pond-ville-davray",
			"id": "pond-ville-davray",
			"title": "The Pond at Ville-d'Avray",
			"artist": "Jean-Baptiste-Camille Corot",
			"year": "c. 1865",
			"orientation": "landscape",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/6/61/%28Agen%29_L%27%C3%A9tang_de_Ville-d%27Avray_-_Corot_-_RF_1787.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:(Agen)_L'étang_de_Ville-d'Avray_-_Corot_-_RF_1787.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "self-portrait-cezanne",
			"id": "self-portrait-cezanne",
			"title": "Self-Portrait",
			"artist": "Paul Cézanne",
			"year": "c. 1880",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/3/32/Paul_C%C3%A9zanne_-_Self-Portrait_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Paul_Cézanne_-_Self-Portrait_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		},
		{
			"slug": "mother-and-child-cassatt",
			"id": "mother-and-child-cassatt",
			"title": "Mother and Child",
			"artist": "Mary Cassatt",
			"year": "c. 1905",
			"orientation": "portrait",
			"source_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Mary_Cassatt_-_Mother_and_Child_-_Google_Art_Project.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original",
			"commons_page": "https://commons.wikimedia.org/wiki/File:Mary_Cassatt_-_Mother_and_Child_-_Google_Art_Project.jpg",
			"license": "Public domain (faithful reproduction of PD artwork)"
		}
	]
};
var plates = data.plates;
var plateCount = data.count;
var bySlug = new Map(plates.map((p) => [p.slug, p]));
function getPlate(slug) {
	return bySlug.get(slug);
}
var artists = Array.from(new Set(plates.map((p) => p.artist))).sort((a, b) => a.localeCompare(b));
function formatYear(year) {
	return String(year);
}
function filterPlates(list, q, artist) {
	const query = q.trim().toLowerCase();
	return list.filter((p) => {
		if (artist && p.artist !== artist) return false;
		if (!query) return true;
		return p.title.toLowerCase().includes(query) || p.artist.toLowerCase().includes(query) || formatYear(p.year).toLowerCase().includes(query);
	});
}
function suggestedPlates(plate, count = 6) {
	const picked = [];
	const seen = /* @__PURE__ */ new Set([plate.slug]);
	const take = (list) => {
		for (const p of list) {
			if (picked.length >= count) return;
			if (seen.has(p.slug)) continue;
			seen.add(p.slug);
			picked.push(p);
		}
	};
	take(plates.filter((p) => p.artist === plate.artist));
	const idx = plates.findIndex((p) => p.slug === plate.slug);
	const neighbors = [];
	for (let d = 1; d < plates.length && neighbors.length < count * 2; d++) {
		const a = plates[idx + d];
		const b = plates[idx - d];
		if (a) neighbors.push(a);
		if (b) neighbors.push(b);
	}
	take(neighbors.filter((p) => p.orientation === plate.orientation));
	take(neighbors);
	take(plates);
	return picked;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/engine-B1396Xbw.js
/** sRGB 0–255 → CIE Lab (D65). */
function rgbToLab(r, g, b) {
	let sr = r / 255;
	let sg = g / 255;
	let sb = b / 255;
	sr = sr > .04045 ? ((sr + .055) / 1.055) ** 2.4 : sr / 12.92;
	sg = sg > .04045 ? ((sg + .055) / 1.055) ** 2.4 : sg / 12.92;
	sb = sb > .04045 ? ((sb + .055) / 1.055) ** 2.4 : sb / 12.92;
	const x = (sr * .4124564 + sg * .3575761 + sb * .1804375) / .95047;
	const y = sr * .2126729 + sg * .7151522 + sb * .072175;
	const z = (sr * .0193339 + sg * .119192 + sb * .9503041) / 1.08883;
	const fx = x > .008856 ? Math.cbrt(x) : 7.787 * x + 16 / 116;
	const fy = y > .008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116;
	const fz = z > .008856 ? Math.cbrt(z) : 7.787 * z + 16 / 116;
	return [
		116 * fy - 16,
		500 * (fx - fy),
		200 * (fy - fz)
	];
}
function labDist(a, b) {
	const dl = a[0] - b[0];
	const da = a[1] - b[1];
	const db = a[2] - b[2];
	return dl * dl + da * da + db * db;
}
var Q = 16;
var LUT_SIZE = 256 * Q;
var palettePromise = null;
function uniqueGlyphs(list) {
	return Array.from(new Set(list));
}
function sampleGlyph(glyph, size = 48) {
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) return null;
	ctx.clearRect(0, 0, size, size);
	ctx.font = `${Math.floor(size * .82)}px ${EMOJI_FONT}`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(glyph, size / 2, size / 2 + 1);
	const { data } = ctx.getImageData(0, 0, size, size);
	let r = 0;
	let g = 0;
	let b = 0;
	let n = 0;
	for (let i = 0; i < data.length; i += 4) {
		if (data[i + 3] < 140) continue;
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
		n++;
	}
	if (n < 8) return null;
	return {
		r: r / n,
		g: g / n,
		b: b / n
	};
}
function buildLut(labs) {
	const lut = new Uint16Array(LUT_SIZE);
	const step = 256 / Q;
	for (let ri = 0; ri < Q; ri++) {
		const r = (ri + .5) * step;
		for (let gi = 0; gi < Q; gi++) {
			const g = (gi + .5) * step;
			for (let bi = 0; bi < Q; bi++) {
				const lab = rgbToLab(r, g, (bi + .5) * step);
				let best = 0;
				let bestD = Infinity;
				for (let i = 0; i < labs.length; i++) {
					const d = labDist(lab, labs[i]);
					if (d < bestD) {
						bestD = d;
						best = i;
					}
				}
				lut[ri << 8 | gi << 4 | bi] = best;
			}
		}
	}
	return lut;
}
function shift(channel) {
	return Math.min(15, channel >> 4);
}
function lutIndex(r, g, b) {
	return shift(r) << 8 | shift(g) << 4 | shift(b);
}
async function waitForEmojiFonts() {
	if (typeof document === "undefined" || !("fonts" in document)) return;
	try {
		await Promise.race([Promise.allSettled([
			document.fonts.load("48px \"Noto Color Emoji\""),
			document.fonts.load("48px \"Apple Color Emoji\""),
			document.fonts.load("48px \"Segoe UI Emoji\"")
		]), new Promise((resolve) => setTimeout(resolve, 600))]);
	} catch {}
}
async function calibrate() {
	await waitForEmojiFonts();
	const glyphs = [];
	const labs = [];
	for (const glyph of uniqueGlyphs(EMOJI_GLYPHS)) {
		const rgb = sampleGlyph(glyph);
		if (!rgb) continue;
		glyphs.push(glyph);
		labs.push(rgbToLab(rgb.r, rgb.g, rgb.b));
	}
	if (glyphs.length < 8) for (const glyph of [
		"🟥",
		"🟧",
		"🟨",
		"🟩",
		"🟦",
		"🟪",
		"🟫",
		"⬛",
		"⬜"
	]) {
		glyphs.push(glyph);
		labs.push(rgbToLab(128, 128, 128));
	}
	return {
		glyphs,
		lut: buildLut(labs)
	};
}
var PALETTE_CACHE_KEY = "eom-palette-v2";
function paletteFromCache() {
	if (typeof localStorage === "undefined") return null;
	try {
		const raw = localStorage.getItem(PALETTE_CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed.n !== EMOJI_GLYPHS.length || !Array.isArray(parsed.glyphs) || !Array.isArray(parsed.lut)) return null;
		if (parsed.lut.length !== LUT_SIZE || parsed.glyphs.length < 8) return null;
		return {
			glyphs: parsed.glyphs,
			lut: Uint16Array.from(parsed.lut)
		};
	} catch {
		return null;
	}
}
function paletteToCache(palette) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(PALETTE_CACHE_KEY, JSON.stringify({
			n: EMOJI_GLYPHS.length,
			glyphs: palette.glyphs,
			lut: Array.from(palette.lut)
		}));
	} catch {}
}
function ensurePalette() {
	if (!palettePromise) palettePromise = (async () => {
		const cached = paletteFromCache();
		if (cached) {
			waitForEmojiFonts();
			return cached;
		}
		const palette = await calibrate();
		paletteToCache(palette);
		return palette;
	})();
	return palettePromise;
}
function gridForImage(width, height, longSideCells) {
	const long = Math.max(2, Math.round(longSideCells));
	if (width >= height) return {
		cols: long,
		rows: Math.max(2, Math.round(long * height / width))
	};
	const rows = long;
	return {
		cols: Math.max(2, Math.round(long * width / height)),
		rows
	};
}
function glyphsToText(glyphs, cols) {
	const lines = [];
	for (let i = 0; i < glyphs.length; i += cols) lines.push(glyphs.slice(i, i + cols).join(""));
	return lines.join("\n");
}
function splitGraphemes(text) {
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text)].map((p) => p.segment);
	return Array.from(text);
}
function parseEmojiGrid(text) {
	const lines = text.replace(/\n+$/, "").split("\n");
	const rows = Math.max(1, lines.length);
	const segs = lines.map(splitGraphemes);
	const cols = Math.max(1, ...segs.map((s) => s.length));
	const glyphs = [];
	for (const row of segs) for (let i = 0; i < cols; i++) glyphs.push(row[i] ?? " ");
	return {
		glyphs,
		cols,
		rows
	};
}
function fileStem(name) {
	return name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "mosaic";
}
function escapeXml(value) {
	const amp = String.fromCharCode(38);
	return value.replace(/[&<>]/g, (ch) => {
		if (ch === "&") return `${amp}amp;`;
		if (ch === "<") return `${amp}lt;`;
		return `${amp}gt;`;
	});
}
function mosaicToSvg(glyphs, cols, rows, colors, cell = 28) {
	const width = Math.max(1, cols * cell);
	const height = Math.max(1, rows * cell);
	const fontPx = Math.max(8, Math.floor(cell * .82));
	const parts = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
		`<rect width="100%" height="100%" fill="#0c0b0a"/>`,
		`<style>text{font-family:${EMOJI_FONT};font-size:${fontPx}px;text-anchor:middle;dominant-baseline:central}</style>`
	];
	const hasColor = Boolean(colors && colors.length >= glyphs.length * 3);
	for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
		const i = y * cols + x;
		const glyph = glyphs[i];
		if (!glyph) continue;
		const px = x * cell;
		const py = y * cell;
		if (hasColor && colors) {
			const r = colors[i * 3];
			const g = colors[i * 3 + 1];
			const b = colors[i * 3 + 2];
			parts.push(`<rect x="${px}" y="${py}" width="${cell + .5}" height="${cell + .5}" fill="rgb(${r},${g},${b})"/>`);
		}
		parts.push(`<text x="${px + cell / 2}" y="${py + cell / 2}">${escapeXml(glyph)}</text>`);
	}
	parts.push(`</svg>`);
	return parts.join("");
}
function downloadText(text, filename, mime) {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
var atlasCanvas = null;
var atlasCtx = null;
var atlasCell = 0;
var atlasCount = 0;
function glyphAtlas(palette, cell) {
	if (typeof document === "undefined") return null;
	if (!atlasCanvas) {
		atlasCanvas = document.createElement("canvas");
		atlasCtx = atlasCanvas.getContext("2d");
	}
	if (!atlasCtx) return null;
	if (atlasCell === cell && atlasCount === palette.glyphs.length) return atlasCanvas;
	const count = palette.glyphs.length;
	atlasCanvas.width = Math.max(1, count * cell);
	atlasCanvas.height = cell;
	atlasCtx.clearRect(0, 0, atlasCanvas.width, atlasCanvas.height);
	atlasCtx.font = `${Math.max(6, Math.floor(cell * .92))}px ${EMOJI_FONT}`;
	atlasCtx.textAlign = "center";
	atlasCtx.textBaseline = "middle";
	for (let i = 0; i < count; i++) atlasCtx.fillText(palette.glyphs[i] ?? "⬜", i * cell + cell / 2, cell / 2);
	atlasCell = cell;
	atlasCount = count;
	return atlasCanvas;
}
function blitMosaic(ctx, sample, pix, cols, rows, palette, canvasW, canvasH, collect) {
	const cellW = canvasW / cols;
	const cellH = canvasH / rows;
	const cell = Math.max(6, Math.floor(Math.min(cellW, cellH)));
	const atlas = glyphAtlas(palette, cell);
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(sample, 0, 0, canvasW, canvasH);
	const glyphs = collect ? new Array(cols * rows) : [];
	const colors = collect ? new Uint8ClampedArray(cols * rows * 3) : /* @__PURE__ */ new Uint8ClampedArray(0);
	const { lut, glyphs: paletteGlyphs } = palette;
	for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
		const i = (y * cols + x) * 4;
		const gi = lut[lutIndex(pix[i], pix[i + 1], pix[i + 2])] ?? 0;
		if (atlas) ctx.drawImage(atlas, gi * cell, 0, cell, cell, x * cellW + (cellW - cell) / 2, y * cellH + (cellH - cell) / 2, cell, cell);
		if (collect) {
			const idx = y * cols + x;
			glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
			colors[idx * 3] = pix[i];
			colors[idx * 3 + 1] = pix[i + 1];
			colors[idx * 3 + 2] = pix[i + 2];
		}
	}
	return {
		glyphs,
		colors
	};
}
function renderMosaic(canvas, source, longSideCells, palette, cssWidth) {
	const { cols, rows } = gridForImage(source.width, source.height, longSideCells);
	const empty = {
		cols,
		rows,
		cells: cols * rows,
		glyphs: [],
		colors: /* @__PURE__ */ new Uint8ClampedArray(0)
	};
	const dpr = typeof window === "undefined" ? 1 : Math.min(2, window.devicePixelRatio || 1);
	const cssH = cssWidth * (source.height / source.width);
	canvas.width = Math.max(1, Math.round(cssWidth * dpr));
	canvas.height = Math.max(1, Math.round(cssH * dpr));
	canvas.style.width = `${cssWidth}px`;
	canvas.style.height = `${cssH}px`;
	const sample = document.createElement("canvas");
	sample.width = cols;
	sample.height = rows;
	const sctx = sample.getContext("2d", { willReadFrequently: true });
	const ctx = canvas.getContext("2d");
	if (!sctx || !ctx) return empty;
	sctx.imageSmoothingEnabled = true;
	sctx.drawImage(source, 0, 0, cols, rows);
	const pix = sctx.getImageData(0, 0, cols, rows).data;
	const painted = blitMosaic(ctx, sample, pix, cols, rows, palette, canvas.width, canvas.height, true);
	return {
		cols,
		rows,
		cells: cols * rows,
		glyphs: painted.glyphs,
		colors: painted.colors
	};
}
function coverVideo(ctx, video, dw, dh) {
	const vw = video.videoWidth;
	const vh = video.videoHeight;
	if (!vw || !vh) return;
	const srcAspect = vw / vh;
	const dstAspect = dw / dh;
	let sx = 0;
	let sy = 0;
	let sw = vw;
	let sh = vh;
	if (srcAspect > dstAspect) {
		sw = vh * dstAspect;
		sx = (vw - sw) / 2;
	} else {
		sh = vw / dstAspect;
		sy = (vh - sh) / 2;
	}
	ctx.drawImage(video, sx, sy, sw, sh, 0, 0, dw, dh);
}
function createLiveRenderer() {
	const sample = document.createElement("canvas");
	const sctx = sample.getContext("2d", { willReadFrequently: true });
	const atlas = document.createElement("canvas");
	const actx = atlas.getContext("2d");
	let out = null;
	let bound = null;
	let atlasCell = 0;
	let atlasCount = 0;
	const rebuildAtlas = (palette, cell) => {
		if (!actx) return;
		const count = palette.glyphs.length;
		atlas.width = Math.max(1, count * cell);
		atlas.height = cell;
		actx.clearRect(0, 0, atlas.width, atlas.height);
		actx.font = `${Math.max(6, Math.floor(cell * .92))}px ${EMOJI_FONT}`;
		actx.textAlign = "center";
		actx.textBaseline = "middle";
		for (let i = 0; i < count; i++) actx.fillText(palette.glyphs[i] ?? "⬜", i * cell + cell / 2, cell / 2);
		atlasCell = cell;
		atlasCount = count;
	};
	return { draw({ canvas, video, wrapW, wrapH, density, palette, capture }) {
		const { cols, rows } = gridForImage(wrapW, wrapH, density);
		const empty = {
			cols,
			rows,
			cells: cols * rows,
			glyphs: [],
			colors: /* @__PURE__ */ new Uint8ClampedArray(0)
		};
		if (!sctx || !actx || !video.videoWidth) return empty;
		const cell = Math.max(6, Math.min(18, Math.floor(1536 / Math.max(cols, rows))));
		const outW = Math.max(1, cols * cell);
		const outH = Math.max(1, rows * cell);
		if (canvas.width !== outW || canvas.height !== outH) {
			canvas.width = outW;
			canvas.height = outH;
			out = null;
			bound = null;
		}
		if (bound !== canvas || !out) {
			out = canvas.getContext("2d", { alpha: false }) ?? canvas.getContext("2d");
			bound = canvas;
		}
		if (!out) return empty;
		if (atlasCell !== cell || atlasCount !== palette.glyphs.length) rebuildAtlas(palette, cell);
		if (sample.width !== cols || sample.height !== rows) {
			sample.width = cols;
			sample.height = rows;
		}
		sctx.imageSmoothingEnabled = true;
		coverVideo(sctx, video, cols, rows);
		const pix = sctx.getImageData(0, 0, cols, rows).data;
		out.imageSmoothingEnabled = false;
		out.drawImage(sample, 0, 0, outW, outH);
		const { lut, glyphs: paletteGlyphs } = palette;
		const glyphs = capture ? new Array(cols * rows) : empty.glyphs;
		const colors = capture ? new Uint8ClampedArray(cols * rows * 3) : empty.colors;
		for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
			const i = (y * cols + x) * 4;
			const gi = lut[lutIndex(pix[i], pix[i + 1], pix[i + 2])] ?? 0;
			out.drawImage(atlas, gi * cell, 0, cell, cell, x * cell, y * cell, cell, cell);
			if (capture) {
				const idx = y * cols + x;
				glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
				colors[idx * 3] = pix[i];
				colors[idx * 3 + 1] = pix[i + 1];
				colors[idx * 3 + 2] = pix[i + 2];
			}
		}
		return {
			cols,
			rows,
			cells: cols * rows,
			glyphs,
			colors
		};
	} };
}
async function renderMosaicAsync(canvas, source, longSideCells, palette, cssWidth, isCancelled) {
	const { cols, rows } = gridForImage(source.width, source.height, longSideCells);
	const empty = {
		cols,
		rows,
		cells: cols * rows,
		glyphs: [],
		colors: /* @__PURE__ */ new Uint8ClampedArray(0)
	};
	const dpr = typeof window === "undefined" ? 1 : Math.min(2, window.devicePixelRatio || 1);
	const cssH = cssWidth * (source.height / source.width);
	canvas.width = Math.max(1, Math.round(cssWidth * dpr));
	canvas.height = Math.max(1, Math.round(cssH * dpr));
	canvas.style.width = `${cssWidth}px`;
	canvas.style.height = `${cssH}px`;
	const sample = document.createElement("canvas");
	sample.width = cols;
	sample.height = rows;
	const sctx = sample.getContext("2d", { willReadFrequently: true });
	const ctx = canvas.getContext("2d");
	if (!sctx || !ctx) return empty;
	sctx.imageSmoothingEnabled = true;
	sctx.drawImage(source, 0, 0, cols, rows);
	const pix = sctx.getImageData(0, 0, cols, rows).data;
	const cellW = canvas.width / cols;
	const cellH = canvas.height / rows;
	const cell = Math.max(6, Math.floor(Math.min(cellW, cellH)));
	const atlas = glyphAtlas(palette, cell);
	const { lut, glyphs: paletteGlyphs } = palette;
	const glyphs = new Array(cols * rows);
	const colors = new Uint8ClampedArray(cols * rows * 3);
	const yieldEvery = longSideCells <= 32 ? rows + 1 : Math.max(4, Math.ceil(rows / 12));
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(sample, 0, 0, canvas.width, canvas.height);
	for (let y = 0; y < rows; y++) {
		if (isCancelled?.()) return empty;
		for (let x = 0; x < cols; x++) {
			const i = (y * cols + x) * 4;
			const gi = lut[lutIndex(pix[i], pix[i + 1], pix[i + 2])] ?? 0;
			if (atlas) ctx.drawImage(atlas, gi * cell, 0, cell, cell, x * cellW + (cellW - cell) / 2, y * cellH + (cellH - cell) / 2, cell, cell);
			const idx = y * cols + x;
			glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
			colors[idx * 3] = pix[i];
			colors[idx * 3 + 1] = pix[i + 1];
			colors[idx * 3 + 2] = pix[i + 2];
		}
		if (y % yieldEvery === yieldEvery - 1) await new Promise((resolve) => requestAnimationFrame(() => resolve()));
	}
	return {
		cols,
		rows,
		cells: cols * rows,
		glyphs,
		colors
	};
}
async function canvasToJpegBase64(canvas, maxWidth = 1200, quality = .84) {
	const scale = Math.min(1, maxWidth / Math.max(1, canvas.width));
	const w = Math.max(1, Math.round(canvas.width * scale));
	const h = Math.max(1, Math.round(canvas.height * scale));
	const out = document.createElement("canvas");
	out.width = w;
	out.height = h;
	const ctx = out.getContext("2d");
	if (!ctx) throw new Error("Could not export JPEG");
	ctx.drawImage(canvas, 0, 0, w, h);
	const blob = await new Promise((resolve, reject) => {
		out.toBlob((b) => b ? resolve(b) : reject(/* @__PURE__ */ new Error("Could not export JPEG")), "image/jpeg", quality);
	});
	const bytes = new Uint8Array(await blob.arrayBuffer());
	let bin = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(bin);
}
function downloadJpeg(base64, filename) {
	const a = document.createElement("a");
	a.href = `data:image/jpeg;base64,${base64}`;
	a.download = filename;
	a.click();
}
var DENSITY_STEPS = [
	24,
	32,
	40,
	48,
	64,
	80,
	96,
	128,
	160
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/share-meta-BmOxACc5.js
var APP = "EMOJI OLD MASTERS";
async function pageOrigin() {
	const { siteOrigin } = await import("./site-origin.server-Bnr-V36N.mjs");
	return siteOrigin();
}
function abs(origin, path) {
	if (!origin) return path;
	return new URL(path, origin).toString();
}
function artworkHead(opts, origin) {
	const pageTitle = `${opts.title} — ${APP}`;
	const url = abs(origin, opts.path);
	const image = abs(origin, opts.imagePath);
	return {
		meta: [
			{ title: pageTitle },
			{
				name: "description",
				content: opts.description
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:site_name",
				content: APP
			},
			{
				property: "og:title",
				content: pageTitle
			},
			{
				property: "og:description",
				content: opts.description
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:image",
				content: image
			},
			{
				property: "og:image:alt",
				content: opts.title
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:type",
				content: "image/jpeg"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: pageTitle
			},
			{
				name: "twitter:description",
				content: opts.description
			},
			{
				name: "twitter:image",
				content: image
			},
			{
				name: "twitter:image:alt",
				content: opts.title
			},
			{ "script:ld+json": {
				"@context": "https://schema.org",
				"@type": "VisualArtwork",
				name: opts.title,
				description: opts.description,
				url,
				image,
				artform: "Emoji mosaic",
				...opts.artist ? { creator: {
					"@type": "Person",
					name: opts.artist
				} } : {},
				...opts.year ? { dateCreated: opts.year } : {},
				isPartOf: {
					"@type": "CreativeWork",
					name: APP,
					url: abs(origin, "/")
				}
			} }
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-ByA-bRxH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-auto border-t border-border bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/emoji-old-masters-plates.csv",
					download: "emoji-old-masters-plates.csv",
					className: "inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg",
					children: "download data"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: FANS_REPO_URL,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg",
					children: "github"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/terms",
					className: "inline-flex h-11 items-center text-sm font-medium text-muted transition-[color] duration-150 ease-out hover:text-fg",
					children: "terms of sale"
				})
			]
		})
	});
}
/** The book is sold on this site's own buy page (Stripe Checkout + RPI print-on-demand). */
var BOOK_PATH = "/book";
function BuyNow({ className, size = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: BOOK_PATH,
		className: cn("inline-flex items-center justify-center rounded-md bg-headline font-bold tracking-wide text-headline-fg transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-96", size === "sm" ? "h-9 px-3 text-xs" : "h-11 px-4 text-sm", className),
		children: ["BUY NOW ", ">"]
	});
}
var MIN_MS = 1800;
var MAX_MS = 5200;
var painted = 0;
var listeners = /* @__PURE__ */ new Set();
function noteMosaicPainted() {
	painted += 1;
	listeners.forEach((fn) => fn());
}
async function waitForBoot() {
	const started = Date.now();
	await Promise.race([ensurePalette().then(() => void 0).catch(() => void 0), new Promise((resolve) => setTimeout(resolve, MAX_MS))]);
	const left = Math.max(0, MIN_MS - (Date.now() - started));
	if (left) await new Promise((r) => setTimeout(r, left));
	if (painted < 2) {
		const extra = Math.max(0, MAX_MS - (Date.now() - started));
		await Promise.race([new Promise((resolve) => {
			const tick = () => {
				if (painted < 2) return;
				listeners.delete(tick);
				resolve();
			};
			listeners.add(tick);
			tick();
		}), new Promise((r) => setTimeout(r, Math.min(2200, extra)))]);
	}
}
var BOOT_STAGES = [
	{
		emoji: "🐌",
		line: "Waking the Old Masters. They’ve been asleep since 1653."
	},
	{
		emoji: "🦆",
		line: "Asking Wikimedia for the big files. Nicely. With a hat."
	},
	{
		emoji: "🍋",
		line: "Squeezing van Gogh’s yellows into a lemon. Watch your eyes."
	},
	{
		emoji: "🧀",
		line: "Briefing a cheese on chiaroscuro. It’s taking notes."
	},
	{
		emoji: "🧮",
		line: "Filling 4,096 color bins. One of them is ‘almost ochre’."
	},
	{
		emoji: "🗿",
		line: "Negotiating with a still life. The pear wants more lines."
	},
	{
		emoji: "🐸",
		line: "Calibrating frog-green to a Flemish meadow."
	},
	{
		emoji: "🍌",
		line: "Casting a banana as John the Baptist. Method acting."
	},
	{
		emoji: "🧵",
		line: "Sewing Vermeer’s pearls onto sparkle emoji. Tiny work."
	},
	{
		emoji: "🚽",
		line: "Max is in the sewers, wrangling glyphs with a stick."
	},
	{
		emoji: "🦞",
		line: "A lobster has entered the palette. This is fine."
	},
	{
		emoji: "🫧",
		line: "Blowing Dutch soap-bubble highlights. Very expensive air."
	},
	{
		emoji: "🪿",
		line: "Herding geese out of the lookup table. Honk, then match."
	},
	{
		emoji: "🪨",
		line: "Teaching ⬛ to brood like a Caravaggio."
	},
	{
		emoji: "🕰️",
		line: "This painting took years. The mosaic is close. Ish."
	},
	{
		emoji: "🧫",
		line: "Culturing a little mold of burnt umber. Science."
	},
	{
		emoji: "🪞",
		line: "Holding a mirror up to nature. Nature asked for a minute."
	},
	{
		emoji: "🐝",
		line: "Bees are polling the nectar of each glyph. Busy, busy."
	}
];
var BOOT_RING = [
	"🎨",
	"🍋",
	"🐸",
	"🗿",
	"🦞",
	"🧀",
	"🍌",
	"🫧"
];
function shuffleStages(items) {
	const next = items.slice();
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = next[i];
		next[i] = next[j];
		next[j] = a;
	}
	return next;
}
function MosaicWait({ compact = false }) {
	const stages = (0, import_react.useMemo)(() => shuffleStages(BOOT_STAGES), []);
	const [index, setIndex] = (0, import_react.useState)(0);
	const stage = stages[index % stages.length] ?? BOOT_STAGES[0];
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setIndex((n) => n + 1);
		}, compact ? 1600 : 1300);
		return () => window.clearInterval(id);
	}, [compact]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-2 px-3 text-center",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end gap-1",
			children: [
				"🎨",
				stage.emoji,
				"🍋"
			].map((glyph, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("boot-bob text-2xl", compact && "text-xl"),
				style: { animationDelay: `${i * 120}ms` },
				children: glyph
			}, `${glyph}-${i}`))
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "boot-line max-w-xs text-sm text-muted",
			children: stage.line
		}, stage.line)]
	});
}
var MAX_CONCURRENT = 8;
var active$1 = 0;
var waiters$1 = [];
function acquire$1() {
	if (active$1 < MAX_CONCURRENT) {
		active$1++;
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		waiters$1.push(() => {
			active$1++;
			resolve();
		});
	});
}
function release$1() {
	active$1--;
	const next = waiters$1.shift();
	if (next) next();
}
var inflight = /* @__PURE__ */ new Map();
function loadImage(src) {
	const cached = inflight.get(src);
	if (cached) return cached;
	const promise = (async () => {
		await acquire$1();
		try {
			const res = await fetch(src, { cache: "force-cache" });
			if (!res.ok) throw new Error("Image failed to load");
			const blob = await res.blob();
			if (typeof createImageBitmap === "function") return await createImageBitmap(blob);
			const img = new Image();
			img.decoding = "async";
			const url = URL.createObjectURL(blob);
			try {
				await new Promise((resolve, reject) => {
					img.onload = () => resolve();
					img.onerror = () => reject(/* @__PURE__ */ new Error("Image failed to load"));
					img.src = url;
				});
			} finally {
				URL.revokeObjectURL(url);
			}
			return img;
		} finally {
			release$1();
		}
	})();
	inflight.set(src, promise);
	promise.catch(() => {
		inflight.delete(src);
	});
	return promise;
}
function loadFromFile(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read that image"));
		};
		img.src = url;
	});
}
var callbacks = /* @__PURE__ */ new Map();
var io = null;
function getObserver() {
	if (!io) io = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			const cb = callbacks.get(entry.target);
			if (!cb) continue;
			const tallEnough = entry.boundingClientRect.height > 32;
			cb(entry.isIntersecting && tallEnough);
		}
	}, {
		root: null,
		rootMargin: "480px 0px",
		threshold: .01
	});
	return io;
}
function observeVisibility(el, cb) {
	callbacks.set(el, cb);
	getObserver().observe(el);
	return () => {
		callbacks.delete(el);
		io?.unobserve(el);
	};
}
var MAX = 3;
var active = 0;
var waiters = [];
function acquire() {
	if (active < MAX) {
		active += 1;
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		waiters.push(() => {
			active += 1;
			resolve();
		});
	});
}
function release() {
	active = Math.max(0, active - 1);
	const next = waiters.shift();
	if (next) next();
}
async function withPaintSlot(fn) {
	await acquire();
	try {
		return await fn();
	} finally {
		release();
	}
}
function MosaicCanvas({ source, src, density = 64, className, label, onRendered, eager = false, fallbackRatio = 4 / 3, loader = "stage", fill = false }) {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const seenRef = (0, import_react.useRef)(eager);
	const countedRef = (0, import_react.useRef)(false);
	const [visible, setVisible] = (0, import_react.useState)(eager);
	const [loaded, setLoaded] = (0, import_react.useState)(source ?? null);
	const [status, setStatus] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		if (source) setLoaded(source);
	}, [source]);
	(0, import_react.useEffect)(() => {
		setStatus("idle");
	}, [density, loaded]);
	(0, import_react.useEffect)(() => {
		if (eager) return;
		const el = wrapRef.current;
		if (!el) return;
		return observeVisibility(el, (inView) => {
			if (inView && !seenRef.current) {
				seenRef.current = true;
				setVisible(true);
			}
		});
	}, [eager]);
	(0, import_react.useEffect)(() => {
		if (!visible || !src || source) return;
		let live = true;
		loadImage(src).then((img) => {
			if (live) setLoaded(img);
		}).catch(() => {
			if (live) setStatus("error");
		});
		return () => {
			live = false;
		};
	}, [
		visible,
		src,
		source
	]);
	(0, import_react.useEffect)(() => {
		if (!visible || !loaded) return;
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!canvas || !wrap) return;
		let cancelled = false;
		const paint = async () => {
			try {
				await withPaintSlot(async () => {
					const palette = await ensurePalette();
					if (cancelled) return;
					const cssWidth = wrap.clientWidth || 320;
					const info = await renderMosaicAsync(canvas, loaded, density, palette, cssWidth, () => cancelled);
					if (cancelled) return;
					setStatus("ready");
					if (!countedRef.current) {
						countedRef.current = true;
						noteMosaicPainted();
					}
					onRendered?.(info, canvas);
				});
			} catch {
				if (!cancelled) setStatus("error");
			}
		};
		paint();
		return () => {
			cancelled = true;
		};
	}, [
		visible,
		loaded,
		density,
		onRendered
	]);
	const ratio = loaded && loaded.width && loaded.height ? loaded.width / loaded.height : fallbackRatio;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: cn("relative w-full overflow-hidden bg-surface-2", fill && "h-full", className),
		style: fill ? void 0 : { aspectRatio: String(ratio) },
		children: [
			status !== "ready" && status !== "error" && loader !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicWait, { compact: loader === "card" }),
			status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-muted",
				children: "Couldn’t build this mosaic"
			}),
			visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				"aria-label": label ?? "Emoji mosaic",
				className: cn("block h-full w-full transition-opacity duration-300 ease-smooth-out", fill && "object-cover", status === "ready" ? "opacity-100" : "opacity-0")
			})
		]
	});
}
var ALLOWED_HOSTS$1 = /* @__PURE__ */ new Set([
	"upload.wikimedia.org",
	"thumb.wikimedia.org",
	"commons.wikimedia.org"
]);
function commonsFilename(url) {
	try {
		const parsed = new URL(url);
		if (!ALLOWED_HOSTS$1.has(parsed.hostname)) return null;
		const path = decodeURIComponent(parsed.pathname);
		const thumb = path.match(/\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\/\d+px-[^/]+$/i);
		if (thumb?.[1]) return thumb[1];
		const original = path.match(/\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/i);
		if (original?.[1]) return original[1];
		return path.split("/").filter(Boolean).pop() ?? null;
	} catch {
		return null;
	}
}
function paintingSrc(url, width) {
	const file = commonsFilename(url);
	if (file) return `/api/image?f=${encodeURIComponent(file)}&w=${width}`;
	return `/api/image?u=${encodeURIComponent(url)}&w=${width}`;
}
var NAV = [
	{
		to: "/",
		label: "Gallery"
	},
	{
		to: "/try",
		label: "📷"
	},
	{
		to: "/about",
		label: "About"
	}
];
var WIDE = plates.filter((p) => p.orientation !== "portrait");
var POOL = WIDE.length ? WIDE : plates;
function plateFromPath(pathname) {
	const match = pathname.match(/^\/plate\/([^/]+)/);
	if (!match?.[1]) return void 0;
	return getPlate(decodeURIComponent(match[1]));
}
function hashPick(key, avoid) {
	const list = avoid ? POOL.filter((p) => p.slug !== avoid) : POOL;
	const src = list.length ? list : POOL;
	let h = 2166136261;
	for (let i = 0; i < key.length; i++) {
		h ^= key.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return src[Math.abs(h) % src.length];
}
function randomPick(avoid) {
	const list = avoid ? POOL.filter((p) => p.slug !== avoid) : POOL;
	const src = list.length ? list : POOL;
	return src[Math.floor(Math.random() * src.length)];
}
var CAM_SEEN_KEY = "eom-seen-camera";
function cameraSeen() {
	try {
		return localStorage.getItem(CAM_SEEN_KEY) === "1";
	} catch {
		return true;
	}
}
function markCameraSeen() {
	try {
		localStorage.setItem(CAM_SEEN_KEY, "1");
	} catch {}
}
function SiteHeader() {
	const viewKey = useRouterState({ select: (s) => `${s.location.pathname}${s.location.searchStr}` });
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [banner, setBanner] = (0, import_react.useState)(() => plateFromPath(pathname) ?? hashPick(viewKey));
	const lastView = (0, import_react.useRef)(viewKey);
	const [pulseCam, setPulseCam] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (lastView.current === viewKey) return;
		lastView.current = viewKey;
		const fromPlate = plateFromPath(pathname);
		setBanner(fromPlate ?? randomPick(banner.slug));
	}, [
		viewKey,
		pathname,
		banner.slug
	]);
	(0, import_react.useEffect)(() => {
		if (pathname === "/try" || pathname.startsWith("/try/")) {
			markCameraSeen();
			setPulseCam(false);
			return;
		}
		setPulseCam(!cameraSeen());
	}, [pathname]);
	const src = paintingSrc(banner.source_image_url, 480);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative sticky top-0 z-30 overflow-hidden border-b border-border bg-transparent",
		children: [src && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 left-0 w-full -translate-y-1/2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicCanvas, {
					src,
					density: 32,
					eager: true,
					fallbackRatio: banner.orientation === "portrait" ? 3 / 4 : 4 / 3,
					className: "bg-transparent",
					loader: "none"
				}, banner.slug)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/60" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "min-w-0 shrink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-sans text-base font-extrabold tracking-wide text-headline uppercase sm:text-2xl",
						children: "EMOJI OLD MASTERS"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-auto flex items-center gap-0.5 sm:gap-1",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/plate/") || pathname.startsWith("/fan/") : pathname === item.to || pathname.startsWith(`${item.to}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							"aria-label": item.to === "/try" ? "Camera" : item.label,
							title: item.to === "/try" ? "Camera" : void 0,
							onClick: item.to === "/try" ? () => {
								markCameraSeen();
								setPulseCam(false);
							} : void 0,
							className: cn("rounded-md px-2 py-2 text-sm font-medium transition-[color,background-color] duration-150 ease-out sm:px-3", item.to === "/try" && "text-lg", active ? "text-fg" : "text-muted hover:text-fg"),
							children: item.to === "/try" && pulseCam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "nav-cam-pulse",
								"aria-hidden": "true",
								children: item.label
							}) : item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyNow, {
					size: "sm",
					className: "shrink-0 sm:h-11 sm:px-4 sm:text-sm"
				})
			]
		})]
	});
}
var STAGE_MS = 1200;
function BootScreen() {
	const stages = (0, import_react.useMemo)(() => shuffleStages(BOOT_STAGES), []);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [gone, setGone] = (0, import_react.useState)(false);
	const [hiding, setHiding] = (0, import_react.useState)(false);
	const stage = stages[index % stages.length] ?? BOOT_STAGES[0];
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setIndex((n) => n + 1);
		}, STAGE_MS);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		let live = true;
		waitForBoot().then(() => {
			if (!live) return;
			setHiding(true);
			window.setTimeout(() => {
				if (live) setGone(true);
			}, 280);
		});
		return () => {
			live = false;
		};
	}, []);
	if (gone) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6 text-center", "transition-[opacity,filter] duration-300 ease-smooth-out", hiding ? "pointer-events-none opacity-0 blur-sm" : "opacity-100"),
		role: "status",
		"aria-live": "polite",
		"aria-busy": !hiding,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex size-56 items-center justify-center sm:size-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "boot-orbit absolute inset-0",
					"aria-hidden": "true",
					children: BOOT_RING.map((glyph, i) => {
						const angle = 360 / BOOT_RING.length * i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "boot-sat",
							style: { ["--sat-angle"]: `${angle}deg` },
							children: glyph
						}, glyph);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "boot-hero relative text-6xl sm:text-7xl",
					"aria-hidden": "true",
					children: stage.emoji
				}, stage.emoji)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-title mt-8 font-sans text-3xl font-extrabold tracking-wide text-headline uppercase sm:text-5xl",
				children: "EMOJI OLD MASTERS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-line mt-4 max-w-sm text-base leading-relaxed text-fg",
				children: stage.line
			}, stage.line),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-subtle",
				children: "Glyphs are heavy. Stay. Laugh. It’s working."
			})
		]
	});
}
var styles_default = "/assets/styles-DP0IhKaS.css";
var APP_NAME = "EMOJI OLD MASTERS";
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-sans text-3xl font-bold tracking-tight text-headline",
				children: "Plate not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "That work isn’t in the catalog. Return to the gallery to browse the plates."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Back to gallery"
			})
		]
	});
}
var Route$27 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=6"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Public-domain Old Master paintings remade as live emoji mosaics. Change density, or try your own image."
			},
			{
				name: "theme-color",
				content: "#0c0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "flex min-h-dvh flex-col bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "top-center",
						toastOptions: { classNames: {
							toast: "border border-border bg-surface text-fg",
							title: "text-fg",
							description: "text-muted"
						} }
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-UE2Hqu7I.mjs");
var Route$26 = createFileRoute("/")({
	validateSearch: (raw) => raw.view === "fans" ? { view: "fans" } : {},
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "EMOJI OLD MASTERS" }] })
});
var $$splitComponentImporter$9 = () => import("./about-CgsjUj__.mjs");
var Route$25 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "About — EMOJI OLD MASTERS" }] })
});
/**
* Emoji Old Masters storefront constants. Pure (no env, no I/O) so it can be
* imported by client pages, server routes and node tests alike.
* Server code never trusts prices or SKUs sent by the browser; it uses these.
*/
var BOOK_TITLE = "Emoji Old Masters";
var BOOK_PRICE_CENTS = 14500;
var BOOK_TAX_CODE = "txcd_35010000";
var RPI_SKU = "BKPH_HCIW_STD_11.750x11.750IN_80C_MT_40_100T_GLS_44";
var RPI_INTERIOR_URL = "https://pub-fc606df28da84dbabc0f8782d8ab944e.r2.dev/rpi/EmojiOldMasters-RPI-INTERIOR-440pp-GLS-300ppi-QR.pdf";
var RPI_COVER_URL = "https://pub-fc606df28da84dbabc0f8782d8ab944e.r2.dev/rpi/EmojiOldMasters-RPI-COVER-440pp-GLS-300ppi-flat-r2.pdf";
var RPI_ITEM_DESCRIPTION = "Emoji Old Masters (440pp hardcover)";
/** Expected print cost per copy (USD, before tax/shipping). */
var EXPECTED_PRINT_COST_USD = 87.3;
/** Quote validity and tolerated shipping overage. */
var QUOTE_TTL_MS = 18e5;
var TIER_LABEL = {
	standard: "Standard",
	expedited: "Expedited",
	rush: "Rush"
};
var TEXT_SHIPPING_DUTIES = "Printed to order and shipped from the US. Orders outside the US may owe import duties, taxes or fees on delivery; these are paid by the buyer.";
var TEXT_REFUND = "Each copy is printed to order. You can cancel for a full refund until 4:00 PM Pacific on the day you order (orders after 4:00 PM PT: until 4:00 PM PT the next day). After that your book goes to print and can't be cancelled or refunded. Misprinted or damaged copies are replaced free.";
var SELLER_NAME = "Max Infeld";
var STORE_NAME = "Emoji Old Masters";
var CONTACT_EMAIL = "maxinfeld@gmail.com";
var CANCEL_CUTOFF_LABEL = "4:00 PM Pacific Time";
var TERMS_EFFECTIVE_DATE = "October 21, 2026";
/** Open Checkout Sessions reserve a copy for this long (matches the 30-min session expiry). */
var RESERVATION_MS = 18e5;
var REASON_TEXT = {
	edition_sold_out: "Sold out: all copies of the edition are gone.",
	daily_count_reached: "Today's 5 copies are sold, back tomorrow at midnight PT."
};
var $$splitComponentImporter$8 = () => import("./book-FTaCmPlj.mjs");
var Route$24 = createFileRoute("/book")({
	head: () => ({ meta: [{ title: "Buy the book · EMOJI OLD MASTERS" }, {
		name: "description",
		content: "Emoji Old Masters: a 440-page 11.75 × 11.75 inch hardcover, printed to order."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./terms-C5s1U-C8.mjs");
var Route$23 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Sale · EMOJI OLD MASTERS" }, {
		name: "description",
		content: "Terms of Sale for the Emoji Old Masters book."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./try-Duvgb1_5.mjs");
var Route$22 = createFileRoute("/try")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Camera — EMOJI OLD MASTERS" }] })
});
var $$splitComponentImporter$5 = () => import("./try-secret-DePnajBf.mjs");
var Route$21 = createFileRoute("/try-secret")({
	beforeLoad: () => {
		throw redirect({ to: "/try" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.store-CmcpZTb6.mjs");
var Route$20 = createFileRoute("/admin/store")({
	head: () => ({ meta: [{ title: "Store admin" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var Route$19 = createFileRoute("/api/fan-image")({ server: { handlers: { GET: async ({ request }) => {
	const id = new URL(request.url).searchParams.get("id") ?? "";
	if (!FAN_ID_RE.test(id)) return new Response("Bad id", { status: 400 });
	const bytes = await loadFanJpegBytes(id);
	if (!bytes) return new Response("Not found", { status: 404 });
	return new Response(new Uint8Array(bytes), {
		status: 200,
		headers: {
			"content-type": "image/jpeg",
			"cache-control": "public, max-age=86400, stale-while-revalidate=604800"
		}
	});
} } } });
var Route$18 = createFileRoute("/api/fan-video")({ server: { handlers: { GET: async ({ request }) => {
	const id = new URL(request.url).searchParams.get("id") ?? "";
	if (!FAN_ID_RE.test(id)) return new Response("Bad id", { status: 400 });
	const clip = await loadFanVideoBytes(id);
	if (!clip) return new Response("Not found", { status: 404 });
	return new Response(new Uint8Array(clip.bytes), {
		status: 200,
		headers: {
			"content-type": clip.mime,
			"cache-control": "public, max-age=86400, stale-while-revalidate=604800"
		}
	});
} } } });
var UA$1 = "EmojiOldMasters/1.0 (https://grok.com; educational public-domain mosaic gallery)";
var ALLOWED_HOSTS = /* @__PURE__ */ new Set([
	"upload.wikimedia.org",
	"thumb.wikimedia.org",
	"commons.wikimedia.org"
]);
var CACHE_DIR$1 = join(process.cwd(), ".data/thumbs");
var MAX_WIDTH = 1600;
var MIN_WIDTH = 80;
function cacheKey(url, width) {
	const hash = createHash("sha1").update(`${width}:${url}`).digest("hex").slice(0, 20);
	return join(CACHE_DIR$1, `${hash}.bin`);
}
function clampWidth(raw) {
	const n = Number(raw ?? "800");
	if (!Number.isFinite(n)) return 800;
	return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(n)));
}
function validFilename(file) {
	if (!file || file.length > 240) return false;
	if (file.includes("/") || file.includes("\\") || file.includes("\0")) return false;
	if (file.includes("..")) return false;
	return true;
}
async function fetchUpstream(url) {
	return fetch(url, {
		headers: {
			"user-agent": UA$1,
			accept: "image/*,*/*;q=0.8"
		},
		redirect: "follow",
		signal: AbortSignal.timeout(15e3)
	});
}
var Route$17 = createFileRoute("/api/image")({ server: { handlers: { GET: async ({ request }) => {
	const src = new URL(request.url);
	const width = clampWidth(src.searchParams.get("w"));
	const file = src.searchParams.get("f");
	const direct = src.searchParams.get("u");
	let upstreamUrl = null;
	if (file) {
		if (!validFilename(file)) return new Response("Bad filename", { status: 400 });
		upstreamUrl = `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(file)}&w=${width}`;
	} else if (direct) {
		let parsed;
		try {
			parsed = new URL(direct);
		} catch {
			return new Response("Bad url", { status: 400 });
		}
		if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) return new Response("Host not allowed", { status: 400 });
		upstreamUrl = parsed.toString();
	} else return new Response("Missing f or u", { status: 400 });
	try {
		const key = cacheKey(upstreamUrl, width);
		try {
			const cached = await readFile(key);
			const meta = await readFile(`${key}.type`, "utf8").catch(() => "image/jpeg");
			return new Response(cached, {
				status: 200,
				headers: {
					"content-type": meta.trim() || "image/jpeg",
					"cache-control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000",
					"access-control-allow-origin": "*"
				}
			});
		} catch {}
		const up = await fetchUpstream(upstreamUrl);
		if (!up.ok) return new Response("Upstream error", { status: 502 });
		const type = up.headers.get("content-type") || "image/jpeg";
		if (!type.startsWith("image/")) return new Response("Not an image", { status: 502 });
		const body = Buffer.from(await up.arrayBuffer());
		mkdir(CACHE_DIR$1, { recursive: true }).then(() => Promise.all([writeFile(key, body), writeFile(`${key}.type`, type)])).catch(() => void 0);
		return new Response(body, {
			status: 200,
			headers: {
				"content-type": type,
				"cache-control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000",
				"access-control-allow-origin": "*"
			}
		});
	} catch {
		return new Response("Fetch failed", { status: 502 });
	}
} } } });
var UA = "EmojiOldMasters/1.0 (https://grok.com; educational public-domain mosaic gallery)";
var FAN_PATH = /^\/fan\/(fan-[a-f0-9]{12})$/;
var SVG_PATH = /^\/svg\/(svg-[a-f0-9]{12})$/;
var PLATE_PATH = /^\/plate\/([a-z0-9-]+)$/;
var CACHE_DIR = join(process.cwd(), ".data/og-plates");
async function letterboxOg(bytes) {
	const dir = await mkdtemp(join(tmpdir(), "eom-og-"));
	const src = join(dir, "in.jpg");
	const out = join(dir, "out.jpg");
	try {
		await writeFile(src, bytes);
		await new Promise((resolve, reject) => {
			const child = spawn("ffmpeg", [
				"-y",
				"-i",
				src,
				"-vf",
				"scale=1200:630:force_original_aspect_ratio=decrease,pad=1200:630:(ow-iw)/2:(oh-ih)/2:#0c0b0a",
				"-q:v",
				"4",
				out
			], { stdio: "ignore" });
			child.on("error", reject);
			child.on("exit", (code) => {
				if (code === 0) resolve();
				else reject(/* @__PURE__ */ new Error("ffmpeg failed"));
			});
		});
		return await readFile(out);
	} catch {
		return bytes;
	} finally {
		await rm(dir, {
			recursive: true,
			force: true
		});
	}
}
function jpegResponse(bytes) {
	return new Response(new Uint8Array(bytes), {
		status: 200,
		headers: {
			"content-type": "image/jpeg",
			"cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
			"access-control-allow-origin": "*"
		}
	});
}
async function fetchPainting(sourceUrl, width = 1200) {
	const file = commonsFilename(sourceUrl);
	const upstream = file ? `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(file)}&w=${width}` : sourceUrl;
	try {
		const up = await fetch(upstream, {
			headers: {
				"user-agent": UA,
				accept: "image/*,*/*;q=0.8"
			},
			redirect: "follow",
			signal: AbortSignal.timeout(15e3)
		});
		if (!up.ok) return null;
		if (!(up.headers.get("content-type") || "image/jpeg").startsWith("image/")) return null;
		return Buffer.from(await up.arrayBuffer());
	} catch {
		return null;
	}
}
function runPython(args) {
	return new Promise((resolve, reject) => {
		const child = spawn("python3", args, {
			cwd: process.cwd(),
			stdio: [
				"ignore",
				"ignore",
				"pipe"
			]
		});
		let err = "";
		child.stderr.on("data", (chunk) => {
			err += String(chunk);
		});
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolve();
			else reject(new Error(err.trim() || "og-mosaic failed"));
		});
	});
}
async function plateMosaicJpeg(slug, sourceUrl) {
	const cached = join(CACHE_DIR, `${slug}.jpg`);
	try {
		return await readFile(cached);
	} catch {}
	const painting = await fetchPainting(sourceUrl, 1200);
	if (!painting) return null;
	const dir = await mkdtemp(join(tmpdir(), "eom-plate-"));
	const src = join(dir, "in.jpg");
	const out = join(dir, "out.jpg");
	try {
		await writeFile(src, painting);
		await runPython([
			join(process.cwd(), "scripts/og-mosaic.py"),
			"--in",
			src,
			"--out",
			out,
			"--long",
			"36"
		]);
		const mosaic = await readFile(out);
		await mkdir(CACHE_DIR, { recursive: true });
		await writeFile(cached, mosaic);
		return mosaic;
	} catch {
		return letterboxOg(painting);
	} finally {
		await rm(dir, {
			recursive: true,
			force: true
		});
	}
}
var Route$16 = createFileRoute("/api/og-preview")({ server: { handlers: { GET: async ({ request }) => {
	const path = new URL(request.url).searchParams.get("p") ?? "";
	const fan = path.match(FAN_PATH);
	if (fan && FAN_ID_RE.test(fan[1])) {
		const bytes = await loadFanOgJpegBytes(fan[1]);
		if (!bytes) return new Response("Not found", { status: 404 });
		return jpegResponse(await letterboxOg(bytes));
	}
	const svg = path.match(SVG_PATH);
	if (svg && SVG_ID_RE.test(svg[1])) {
		const bytes = await loadSvgPosterBytes(svg[1]);
		if (!bytes) return new Response("Not found", { status: 404 });
		return jpegResponse(await letterboxOg(bytes));
	}
	const plateMatch = path.match(PLATE_PATH);
	if (plateMatch) {
		const plate = getPlate(plateMatch[1]);
		if (!plate) return new Response("Not found", { status: 404 });
		const img = await plateMosaicJpeg(plate.slug, plate.source_image_url);
		if (!img) return new Response("Upstream error", { status: 502 });
		return jpegResponse(img);
	}
	return new Response("Bad path", { status: 400 });
} } } });
var Route$15 = createFileRoute("/api/repin")({ server: { handlers: { GET: async () => {
	const result = await pinAllUnpinned();
	return Response.json(result);
} } } });
var Route$14 = createFileRoute("/api/svg-reel")({ server: { handlers: { GET: async ({ request }) => {
	const src = new URL(request.url);
	const id = src.searchParams.get("id") ?? "";
	const kind = src.searchParams.get("k") ?? "file";
	if (!SVG_ID_RE.test(id)) return new Response("Bad id", { status: 400 });
	if (kind === "poster") {
		const bytes = await loadSvgPosterBytes(id);
		if (!bytes) return new Response("Not found", { status: 404 });
		return new Response(new Uint8Array(bytes), {
			status: 200,
			headers: {
				"content-type": "image/jpeg",
				"cache-control": "public, max-age=86400"
			}
		});
	}
	if (kind === "frames") {
		const json = await loadSvgFramesJson(id);
		if (!json) return new Response("Not found", { status: 404 });
		return new Response(json, {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "public, max-age=86400"
			}
		});
	}
	const svg = await loadSvgFile(id);
	if (!svg) return new Response("Not found", { status: 404 });
	return new Response(svg, {
		status: 200,
		headers: {
			"content-type": "image/svg+xml; charset=utf-8",
			"cache-control": "public, max-age=86400"
		}
	});
} } } });
var $$splitComponentImporter$3 = () => import("./fan._id-C18SpoIN.mjs");
var Route$13 = createFileRoute("/fan/$id")({
	loader: async ({ params }) => {
		if (!FAN_ID_RE.test(params.id)) throw notFound();
		const work = await getFanWork({ data: { id: params.id } });
		if (!work) throw notFound();
		return work;
	},
	head: async ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Emoji New Master" }] };
		const origin = await pageOrigin();
		const kind = loaderData.kind === "clip" ? "emoji video" : "emoji mosaic";
		return artworkHead({
			title: loaderData.title,
			description: `${loaderData.title} — ${loaderData.cols} × ${loaderData.rows} ${kind}. Make your own Emoji New Master.`,
			path: `/fan/${loaderData.id}`,
			imagePath: `/api/og-preview?p=${encodeURIComponent(`/fan/${loaderData.id}`)}`
		}, origin);
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./order._token-ZGAb74r7.mjs");
var Route$12 = createFileRoute("/order/$token")({
	head: () => ({ meta: [{ title: "Your order · EMOJI OLD MASTERS" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./plate._slug-Ba4O-Elr.mjs");
var Route$11 = createFileRoute("/plate/$slug")({
	loader: ({ params }) => {
		const plate = getPlate(params.slug);
		if (!plate) throw notFound();
		return plate;
	},
	head: async ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "EMOJI OLD MASTERS" }] };
		const origin = await pageOrigin();
		return artworkHead({
			title: loaderData.title,
			description: `${loaderData.title} by ${loaderData.artist}, ${formatYear(loaderData.year)}. Live emoji mosaic.`,
			path: `/plate/${loaderData.slug}`,
			imagePath: `/api/og-preview?p=${encodeURIComponent(`/plate/${loaderData.slug}`)}`,
			artist: loaderData.artist,
			year: formatYear(loaderData.year)
		}, origin);
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./svg._id-Dx4ek9-c.mjs");
var Route$10 = createFileRoute("/svg/$id")({
	loader: async ({ params }) => {
		if (!SVG_ID_RE.test(params.id)) throw notFound();
		const work = await getSvgReel({ data: { id: params.id } });
		if (!work) throw notFound();
		return work;
	},
	head: async ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "SVG reel — EMOJI OLD MASTERS" }] };
		const origin = await pageOrigin();
		return artworkHead({
			title: loaderData.title,
			description: `${loaderData.title} — experimental emoji SVG reel, ${loaderData.cols} × ${loaderData.rows}, ${loaderData.frameCount} frames.`,
			path: `/svg/${loaderData.id}`,
			imagePath: `/api/og-preview?p=${encodeURIComponent(`/svg/${loaderData.id}`)}`
		}, origin);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Server-only store env. Never import from client code, never log values.
* Names only are listed in README.md.
*/
function read(name) {
	return (typeof process !== "undefined" ? process.env[name] : void 0)?.trim() ?? "";
}
var STORE_ENV_NAMES = [
	"PUBLIC_BASE_URL",
	"STRIPE_SECRET_KEY",
	"STRIPE_WEBHOOK_SECRET",
	"RPI_API_AUTH",
	"RPI_WEBHOOK_SECRET",
	"CRON_SECRET"
];
var storeEnv = {
	publicBaseUrl: () => (read("PUBLIC_BASE_URL") || "https://emoji.grok.me").replace(/\/+$/, ""),
	stripeSecretKey: () => read("STRIPE_SECRET_KEY"),
	stripeWebhookSecret: () => read("STRIPE_WEBHOOK_SECRET"),
	rpiBaseUrl: () => read("RPI_BASE_URL") || "https://open.api.rpiprint.com",
	rpiApiAuth: () => read("RPI_API_AUTH"),
	rpiWebhookSecret: () => read("RPI_WEBHOOK_SECRET"),
	cronSecret: () => read("CRON_SECRET")
};
/** Booleans only: which names are set. */
function storeEnvStatus() {
	return Object.fromEntries(STORE_ENV_NAMES.map((n) => [n, read(n) !== ""]));
}
/**
* RPI customerOrderId series for this book. 001–003 were manual/test orders
* (003 is pending at RPI and must never be touched), so live orders start at 004.
*/
var ORDER_ID_PREFIX = "emoji-old-masters-440pp-gls-";
var RESERVED_ORDER_IDS = /* @__PURE__ */ new Set([
	"emoji-old-masters-440pp-gls-001",
	"emoji-old-masters-440pp-gls-002",
	"emoji-old-masters-440pp-gls-003"
]);
function formatOrderId(seq, suffix = "") {
	if (!Number.isInteger(seq) || seq < 4) throw new Error(`order sequence ${seq} is below the first live sequence`);
	const id = `${ORDER_ID_PREFIX}${String(seq).padStart(3, "0")}${suffix}`;
	assertUsableOrderId(id);
	return id;
}
function assertUsableOrderId(id) {
	const base = id.replace(/-r\d+$/, "");
	if (RESERVED_ORDER_IDS.has(base)) throw new Error("reserved customerOrderId");
	if (id.length > 40) throw new Error("customerOrderId longer than 40 characters");
	if (!id.startsWith("emoji-old-masters-440pp-gls-")) throw new Error("customerOrderId outside the store series");
}
/**
* Where the store sells. Max chose US + Canada + UK + EU (Oct 21, 2026).
* RPI Print's Generic account refuses every country except US and CA, and its
* shipping estimate cannot price any other country, so UK/EU stay listed in
* PENDING_COUNTRIES and are refused with a clear message until RPI ships there.
* The live RPI estimate is still the final word for every address.
*/
var ENABLED_COUNTRIES = ["US", "CA"];
var PENDING_COUNTRIES = [
	"GB",
	"AT",
	"BE",
	"BG",
	"HR",
	"CY",
	"CZ",
	"DK",
	"EE",
	"FI",
	"FR",
	"DE",
	"GR",
	"HU",
	"IE",
	"IT",
	"LV",
	"LT",
	"LU",
	"MT",
	"NL",
	"PL",
	"PT",
	"RO",
	"SK",
	"SI",
	"ES",
	"SE"
];
/** RPI refuses military addresses. */
var BLOCKED_US_REGIONS = /* @__PURE__ */ new Set([
	"AA",
	"AE",
	"AP"
]);
function checkRegion(country, region) {
	const c = country.trim().toUpperCase();
	const r = region.trim().toUpperCase();
	if (PENDING_COUNTRIES.includes(c)) return {
		ok: false,
		reason: "pending_country"
	};
	if (!ENABLED_COUNTRIES.includes(c)) return {
		ok: false,
		reason: "unsupported_country"
	};
	if (!r) return {
		ok: false,
		reason: "missing_region"
	};
	if (c === "US" && BLOCKED_US_REGIONS.has(r)) return {
		ok: false,
		reason: "military"
	};
	return { ok: true };
}
/** Outside the US customs territory: RPI needs a retailPrice on the item. */
function needsCustomsValue(country, region) {
	const c = country.toUpperCase();
	const r = region.toUpperCase();
	if (c !== "US") return true;
	return [
		"PR",
		"GU",
		"VI",
		"AS",
		"MP",
		"UM"
	].includes(r);
}
var REGION_MESSAGES = {
	unsupported_country: "Sorry, we can't ship to that country yet. We ship to the US and Canada.",
	pending_country: "UK and EU shipping isn't available from our printer yet. We ship to the US and Canada for now.",
	military: "Our printer can't deliver to APO/FPO/DPO military addresses.",
	missing_region: "Please enter a state or province."
};
/** Buyer-facing daily limit: copies only. (The dollar figure is an admin alert, not a cap.) */
function capCheck(args) {
	if (args.ordersToday >= args.maxOrders) return {
		ok: false,
		reason: "count"
	};
	return { ok: true };
}
/** Admin alert: today's estimated RPI exposure is above the alert threshold. */
function exposureAlert(exposureTodayUsd, thresholdUsd) {
	return thresholdUsd > 0 && exposureTodayUsd > thresholdUsd;
}
/** Per-order sanity: RPI total above ($145 + paid shipping) × 1.15. */
function rpiTotalTooHigh(rpiOrderTotalUsd, paidShippingCents) {
	if (typeof rpiOrderTotalUsd !== "number") return false;
	const limit = (BOOK_PRICE_CENTS + (paidShippingCents ?? 0)) / 100 * 1.15;
	return rpiOrderTotalUsd > Math.round(limit * 100) / 100;
}
function printCostTooHigh(printUsdPerCopy) {
	return typeof printUsdPerCopy === "number" && printUsdPerCopy > 140;
}
function shippingOverageTooHigh(rpiShippingUsd, paidShippingCents) {
	if (typeof rpiShippingUsd !== "number") return false;
	return rpiShippingUsd - paidShippingCents / 100 > 2;
}
function quoteIsFresh(createdAt, now) {
	return now.getTime() - createdAt.getTime() <= QUOTE_TTL_MS;
}
function subtotalIsExpected(amountSubtotalCents) {
	return amountSubtotalCents === BOOK_PRICE_CENTS;
}
/** Normalize RPI's tier names (express/priority are legacy names). */
function normalizeTier(c) {
	const v = (c ?? "").toLowerCase();
	if (v === "standard" || v === "economy") return "standard";
	if (v === "expedited" || v === "express") return "expedited";
	if (v === "rush" || v === "priority") return "rush";
	return null;
}
/** RPI status → site state (null = handled elsewhere / no change). */
function mapRpiStatus(s) {
	switch (s) {
		case "QUEUED":
		case "RECEIVED":
		case "VALIDATING": return "RPI_CREATED";
		case "VALID_AWAITING_PAYMENT": return "CANCEL_WINDOW";
		case "VALID_HOLDING_BIN":
		case "PRINTING":
		case "RECEIVED_BY_PRINTER":
		case "IN_PRODUCTION":
		case "READY_TO_SHIP": return "LOCKED";
		case "SHIPPED": return "SHIPPED";
		case "FAILED": return "PREFLIGHT_REJECTED";
		case "REJECTED": return "NEEDS_ATTENTION";
		case "EXCEPTION":
		case "CANCELLATION_REQUESTED": return "NEEDS_ATTENTION";
		default: return null;
	}
}
var RANK = {
	RPI_CREATING: 1,
	RPI_CREATED: 2,
	CANCEL_WINDOW: 3,
	LOCKED: 4,
	SHIPPED: 5
};
/** Forward-only progression for normal RPI status updates. */
function isForward(from, to) {
	const a = RANK[from];
	const b = RANK[to];
	if (a === void 0 || b === void 0) return to === "NEEDS_ATTENTION" || to === "PREFLIGHT_REJECTED" || to === "RPI_REJECTED" ? from !== "SHIPPED" : false;
	return b > a;
}
/** Customer may cancel for a refund: before the deadline and before RPI locks. */
function customerCanCancel(state, deadline, now) {
	if (!deadline || now.getTime() >= deadline.getTime()) return false;
	return [
		"PAID",
		"DEFERRED",
		"HELD",
		"RPI_CREATED",
		"CANCEL_WINDOW"
	].includes(state);
}
/** RPI GET-before-retry backoff, minutes after each failed attempt. */
var RETRY_BACKOFF_MIN = [
	1,
	2,
	5,
	15,
	30,
	60
];
/**
* RPI Print API client. Pure: callers inject fetch, base URL and the
* Authorization value (env RPI_API_AUTH). The auth value is never logged,
* returned or included in errors.
*/
function rpiDestination(a) {
	return {
		name: a.name,
		address1: a.address1,
		...a.address2 ? { address2: a.address2 } : {},
		city: a.city,
		regionCode: a.region.toUpperCase(),
		postal: a.postal,
		country: a.country.toUpperCase(),
		email: a.email,
		...a.phone ? { phone: a.phone } : {}
	};
}
function createOrderBody(args) {
	assertUsableOrderId(args.customerOrderId);
	return {
		customerOrderId: args.customerOrderId,
		currency: "USD",
		shippingClassification: args.tier,
		webhookUrl: args.webhookUrl,
		payload: args.payload.slice(0, 512),
		destination: rpiDestination(args.address),
		orderItems: [{
			sku: RPI_SKU,
			quantity: 1,
			retailPrice: args.retailPriceUsd,
			itemDescription: RPI_ITEM_DESCRIPTION,
			product: {
				coverUrl: RPI_COVER_URL,
				gutsUrl: RPI_INTERIOR_URL
			}
		}],
		_customs: needsCustomsValue(args.address.country, args.address.region)
	};
}
function createRpiClient(opts) {
	const f = opts.fetch ?? fetch;
	const base = opts.baseUrl.replace(/\/+$/, "");
	const timeoutMs = opts.timeoutMs ?? 8e3;
	async function call(method, path, body) {
		const ctrl = new AbortController();
		const timer = setTimeout(() => ctrl.abort(), timeoutMs);
		try {
			const res = await f(`${base}${path}`, {
				method,
				headers: {
					Authorization: opts.auth,
					Accept: "application/json",
					...body ? { "Content-Type": "application/json" } : {}
				},
				body: body ? JSON.stringify(body) : void 0,
				signal: ctrl.signal
			});
			const text = await res.text();
			let data = null;
			try {
				data = text ? JSON.parse(text) : null;
			} catch {
				data = null;
			}
			if (res.ok) return {
				kind: "ok",
				status: res.status,
				data
			};
			const d = data ?? {};
			return {
				kind: "http",
				status: res.status,
				error: String(d.errorDescription ?? d.message ?? `HTTP ${res.status}`).slice(0, 300)
			};
		} catch (err) {
			return {
				kind: "network",
				error: err?.name === "AbortError" ? "timeout" : "network error"
			};
		} finally {
			clearTimeout(timer);
		}
	}
	return {
		async shippingEstimate(address) {
			const r = await call("POST", "/orders/shipping/estimate", {
				currency: "USD",
				destination: rpiDestination(address),
				orderItems: [{
					sku: RPI_SKU,
					quantity: 1,
					pageCount: 440
				}]
			});
			if (r.kind !== "ok") return r;
			const out = [];
			for (const m of Array.isArray(r.data) ? r.data : []) {
				const tier = normalizeTier(m.methodClassification);
				const price = Number(m.price);
				if (!tier || !Number.isFinite(price) || price < 0) continue;
				if (out.some((o) => o.tier === tier)) continue;
				out.push({
					tier,
					priceUsd: Math.round(price * 100) / 100,
					methodName: m.methodName ?? null,
					estimatedShipDate: m.estimatedShipDateUTC ?? null,
					estimatedDeliveryDate: m.estimatedDeliveryDateUTC ?? null
				});
			}
			return {
				kind: "ok",
				status: r.status,
				data: out
			};
		},
		/** Print cost per copy from RPI's pricing estimate (pre-create safety stop). */
		async printCostPerCopy() {
			const r = await call("POST", "/pricing/production", {
				currency: "USD",
				orderItems: [{
					sku: RPI_SKU,
					quantity: 1,
					pageCount: 440
				}]
			});
			if (r.kind !== "ok") return r;
			const p = Number(r.data?.productionPrice);
			if (!Number.isFinite(p)) return {
				kind: "http",
				status: 200,
				error: "no productionPrice"
			};
			return {
				kind: "ok",
				status: 200,
				data: p
			};
		},
		getOrder(customerOrderId) {
			assertUsableOrderId(customerOrderId);
			return call("GET", `/orders/${encodeURIComponent(customerOrderId)}`);
		},
		createOrder(body) {
			assertUsableOrderId(body.customerOrderId);
			const { _customs: _ignored, ...wire } = body;
			return call("POST", "/orders/create", wire);
		},
		cancelOrder(customerOrderId) {
			assertUsableOrderId(customerOrderId);
			return call("DELETE", `/orders/${encodeURIComponent(customerOrderId)}`);
		},
		async ping() {
			const r = await call("GET", "/orders?limit=1");
			return r.kind === "ok" ? {
				ok: true,
				status: r.status
			} : {
				ok: false,
				status: r.kind === "http" ? r.status : 0
			};
		}
	};
}
/**
* Create with GET-before-retry. Never invents a new id. On timeout/5xx/network
* or "already used" 400, GET the same id: 200 → adopt; 404 → retry later
* (reconcile cron retries with the SAME id).
*/
async function createWithGetBeforeRetry(client, body) {
	const r = await client.createOrder(body);
	if (r.kind === "ok") return { kind: "created" };
	if (r.kind === "http" && (r.status === 401 || r.status === 403)) return { kind: "auth_failed" };
	if (!(r.kind === "network" || r.kind === "http" && r.status >= 500 || r.kind === "http" && r.status === 400 && /already|exist|duplicate|used/i.test(r.error))) return {
		kind: "rejected",
		error: r.kind === "http" ? r.error : "error"
	};
	const g = await client.getOrder(body.customerOrderId);
	if (g.kind === "ok") return { kind: "adopted" };
	if (g.kind === "http" && (g.status === 401 || g.status === 403)) return { kind: "auth_failed" };
	if (r.kind === "http" && r.status === 400) return {
		kind: "rejected",
		error: "id reported used but GET did not find it"
	};
	return {
		kind: "retry_later",
		error: r.kind === "network" ? r.error : `HTTP ${r.status}`
	};
}
/** 4:00 PM America/Los_Angeles cancel cutoff and the 02:15 UTC deferred run. */
var TZ = "America/Los_Angeles";
function laParts(d) {
	const f = new Intl.DateTimeFormat("en-US", {
		timeZone: TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23"
	});
	const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
	return {
		y: +p.year,
		m: +p.month,
		d: +p.day,
		h: +p.hour,
		min: +p.minute,
		s: +p.second
	};
}
/** UTC instant of a wall-clock time in Los Angeles (handles PDT/PST). */
function laWallToUtc(y, m, d, h) {
	let guess = Date.UTC(y, m - 1, d, h + 8);
	for (let i = 0; i < 3; i++) {
		const p = laParts(new Date(guess));
		const diff = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min) - Date.UTC(y, m - 1, d, h);
		if (diff === 0) break;
		guess -= diff;
	}
	return new Date(guess);
}
/** Next 16:00 Los Angeles time strictly after `paidAt`. */
function cancelDeadlineFor(paidAt) {
	const p = laParts(paidAt);
	const today = laWallToUtc(p.y, p.m, p.d, 16);
	if (paidAt.getTime() < today.getTime()) return today;
	const next = new Date(Date.UTC(p.y, p.m - 1, p.d + 1));
	return laWallToUtc(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), 16);
}
function isAfterTodayCutoff(now) {
	const p = laParts(now);
	return now.getTime() >= laWallToUtc(p.y, p.m, p.d, 16).getTime();
}
/** Next 02:15 UTC strictly after `now` (just after RPI's nightly charge). */
function nextPostChargeRunUtc(now) {
	const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 2, 15));
	if (t.getTime() <= now.getTime()) t.setUTCDate(t.getUTCDate() + 1);
	return t;
}
/** Most recent midnight America/Los_Angeles (the buyer-facing daily limit resets then). */
function ptDayStartUtc(now) {
	const p = laParts(now);
	return laWallToUtc(p.y, p.m, p.d, 0);
}
/** Next midnight America/Los_Angeles after `now`. */
function nextPtMidnightUtc(now) {
	const p = laParts(now);
	const next = new Date(Date.UTC(p.y, p.m - 1, p.d + 1));
	return laWallToUtc(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), 0);
}
/**
* Minimal Stripe REST client (form-encoded) so the store needs no SDK.
* Pure: callers inject fetch and the secret key. Never logs the key.
*/
/** Flatten nested objects/arrays into Stripe's bracket form encoding. */
function formEncode(obj, prefix = "", out = new URLSearchParams()) {
	for (const [k, v] of Object.entries(obj)) {
		if (v === void 0 || v === null) continue;
		const key = prefix ? `${prefix}[${k}]` : k;
		if (Array.isArray(v)) v.forEach((item, i) => {
			if (item !== null && typeof item === "object") formEncode(item, `${key}[${i}]`, out);
			else out.append(`${key}[${i}]`, String(item));
		});
		else if (typeof v === "object") formEncode(v, key, out);
		else out.append(key, String(v));
	}
	return out;
}
function daysUntil(iso, now) {
	if (!iso) return null;
	const t = Date.parse(iso);
	if (!Number.isFinite(t)) return null;
	return Math.max(1, Math.ceil((t - now.getTime()) / 864e5));
}
function shippingOptionsFor(options, now = /* @__PURE__ */ new Date()) {
	return options.map((o) => {
		const days = daysUntil(o.estimatedDeliveryDate, now);
		return { shipping_rate_data: {
			type: "fixed_amount",
			display_name: `${TIER_LABEL[o.tier]} (printed to order)`,
			fixed_amount: {
				amount: Math.round(o.priceUsd * 100),
				currency: "usd"
			},
			tax_behavior: "exclusive",
			metadata: { tier: o.tier },
			...days ? { delivery_estimate: {
				minimum: {
					unit: "business_day",
					value: days
				},
				maximum: {
					unit: "business_day",
					value: days + 3
				}
			} } : {}
		} };
	});
}
function checkoutSessionParams(args) {
	const orderUrl = `${args.baseUrl}/order/${args.orderToken}`;
	return {
		mode: "payment",
		customer: args.customerId,
		client_reference_id: args.orderToken,
		line_items: [{
			quantity: 1,
			price_data: {
				currency: "usd",
				unit_amount: BOOK_PRICE_CENTS,
				tax_behavior: "exclusive",
				product_data: {
					name: `${BOOK_TITLE} (hardcover, 440 pages, 11.75 × 11.75 in)`,
					tax_code: BOOK_TAX_CODE
				}
			}
		}],
		shipping_options: shippingOptionsFor([args.option]),
		automatic_tax: { enabled: true },
		payment_method_types: ["card"],
		consent_collection: { terms_of_service: "required" },
		custom_text: {
			submit: { message: TEXT_REFUND },
			terms_of_service_acceptance: { message: `I agree to the [Terms of Sale](${args.baseUrl}/terms).` }
		},
		metadata: {
			order_token: args.orderToken,
			quote_id: args.quoteId,
			tier: args.option.tier
		},
		payment_intent_data: {
			description: `${BOOK_TITLE}: track or cancel your order at ${orderUrl}`,
			metadata: { order_token: args.orderToken }
		},
		success_url: `${orderUrl}?new=1`,
		cancel_url: `${args.baseUrl}/book`,
		expires_at: Math.floor(Date.now() / 1e3) + 1800
	};
}
function customerParams(a) {
	const addr = {
		line1: a.address1,
		line2: a.address2 || void 0,
		city: a.city,
		state: a.region.toUpperCase(),
		postal_code: a.postal,
		country: a.country.toUpperCase()
	};
	return {
		email: a.email,
		name: a.name,
		phone: a.phone || void 0,
		address: addr,
		shipping: {
			name: a.name,
			phone: a.phone || void 0,
			address: addr
		}
	};
}
function createStripeClient(opts) {
	const f = opts.fetch ?? fetch;
	async function call(method, path, params, idem) {
		const ctrl = new AbortController();
		const timer = setTimeout(() => ctrl.abort(), 1e4);
		try {
			const body = params ? formEncode(params).toString() : void 0;
			const url = method === "GET" && body ? `https://api.stripe.com${path}?${body}` : `https://api.stripe.com${path}`;
			const res = await f(url, {
				method,
				headers: {
					Authorization: `Bearer ${opts.secretKey}`,
					...method !== "GET" ? { "Content-Type": "application/x-www-form-urlencoded" } : {},
					...idem ? { "Idempotency-Key": idem } : {}
				},
				body: method === "GET" ? void 0 : body,
				signal: ctrl.signal
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(`stripe ${path} HTTP ${res.status}`);
			return data;
		} finally {
			clearTimeout(timer);
		}
	}
	return {
		createCustomer: (a, idem) => call("POST", "/v1/customers", customerParams(a), idem),
		createCheckoutSession: (p, idem) => call("POST", "/v1/checkout/sessions", p, idem),
		retrieveSession: (id) => call("GET", `/v1/checkout/sessions/${encodeURIComponent(id)}`, { expand: ["payment_intent.latest_charge", "total_details"] }),
		refund: (paymentIntent, idem) => call("POST", "/v1/refunds", { payment_intent: paymentIntent }, idem),
		keyIsLive: () => opts.secretKey.startsWith("sk_live_") || opts.secretKey.startsWith("rk_live_")
	};
}
/**
* Store orchestration with injected dependencies (sql, RPI client, Stripe
* client, clock), so tests run it on in-memory PGLite with mocked HTTP.
* Rules: never create an RPI order unless sales are ON, under caps, paid,
* amount-checked and print cost is within the safety stop. Never touch ids
* at or below -003. Never log addresses, tokens or secrets.
*/
var token = () => randomBytes(16).toString("base64url");
var asDate = (v) => v ? new Date(v) : null;
function createStore(deps) {
	const { sql } = deps;
	const now = deps.now ?? (() => /* @__PURE__ */ new Date());
	async function getSetting(key) {
		return (await sql.query("select value from store_settings where key = $1", [key]))[0]?.value ?? "";
	}
	async function setSetting(key, value) {
		await sql.query("insert into store_settings (key, value) values ($1, $2) on conflict (key) do update set value = excluded.value", [key, value]);
	}
	async function salesOpen() {
		return await getSetting("ORDERS_ENABLED") === "true";
	}
	async function audit(orderId, from, to, actor, note = "") {
		await sql.query("insert into store_audit (order_id, from_state, to_state, actor, note) values ($1, $2, $3, $4, $5)", [
			orderId,
			from,
			to,
			actor,
			note.slice(0, 500)
		]);
	}
	async function alert(level, message, orderId = null) {
		await sql.query("insert into store_alerts (level, message, order_id) values ($1, $2, $3)", [
			level,
			message.slice(0, 500),
			orderId
		]);
	}
	async function tripKillSwitch(reason) {
		await setSetting("ORDERS_ENABLED", "false");
		await setSetting("KILL_REASON", reason);
		await audit(null, null, null, "system", `kill switch: ${reason}`);
		await alert("critical", `Sales turned OFF automatically: ${reason}`);
	}
	async function bump(name, windowMs) {
		const t = now();
		const row = (await sql.query("select window_start, count from store_counters where name = $1", [name]))[0];
		if (!row || t.getTime() - new Date(row.window_start).getTime() > windowMs) {
			await sql.query("insert into store_counters (name, window_start, count) values ($1, $2, 1) on conflict (name) do update set window_start = $2, count = 1", [name, t.toISOString()]);
			return 1;
		}
		await sql.query("update store_counters set count = count + 1 where name = $1", [name]);
		return Number(row.count) + 1;
	}
	async function noteBadSignature(source) {
		if (await bump(`badsig:${source}`, 36e5) > 20) await tripKillSwitch(`more than 20 bad ${source} webhook signatures in an hour`);
	}
	async function getOrder(id) {
		return (await sql.query("select * from store_orders where id = $1", [id]))[0] ?? null;
	}
	async function transition(o, to, actor, note = "", extra = {}) {
		const cols = Object.keys(extra);
		const sets = [
			"state = $2",
			"updated_at = now()",
			...cols.map((c, i) => `${c} = $${i + 3}`)
		];
		await sql.query(`update store_orders set ${sets.join(", ")} where id = $1`, [
			o.id,
			to,
			...cols.map((c) => extra[c])
		]);
		await audit(o.id, o.state, to, actor, note);
		o.state = to;
		Object.assign(o, extra);
	}
	/**
	* Counting rules (Max, Oct 21, 2026):
	* - a copy is "taken" by a paid order that wasn't cancelled/refunded, or by an
	*   open Checkout Session created in the last 30 minutes (a reservation);
	* - the edition counts all taken copies; the daily limit counts copies taken
	*   since midnight PT.
	* SQL fragments are shared by the status read and the atomic checkout insert.
	*/
	const TAKEN_SQL = `((paid_at is not null and state <> 'CANCELLED_REFUNDED')
      or (state = 'CHECKOUT_OPEN' and stripe_session_id is not null and created_at >= $RES))`;
	const TODAY_SQL = `((paid_at is not null and state <> 'CANCELLED_REFUNDED' and paid_at >= $DAY)
      or (state = 'CHECKOUT_OPEN' and stripe_session_id is not null and created_at >= $RES))`;
	function windows() {
		const t = now();
		return {
			day: ptDayStartUtc(t).toISOString(),
			res: new Date(t.getTime() - RESERVATION_MS).toISOString(),
			resetsAt: nextPtMidnightUtc(t).toISOString()
		};
	}
	async function capStatus(_nextShippingUsd, excludeOrderId = null) {
		const w = windows();
		const where = TODAY_SQL.replaceAll("$DAY", "$1").replaceAll("$RES", "$2");
		const rows = await sql.query(`select count(*)::int as n, coalesce(sum(coalesce(amount_shipping_cents, quoted_shipping_cents, 0)), 0)::int as ship
       from store_orders where ${where} and ($3::text is null or id <> $3)`, [
			w.day,
			w.res,
			excludeOrderId
		]);
		const n = Number(rows[0]?.n ?? 0);
		const exposure = Math.round((n * EXPECTED_PRINT_COST_USD + Number(rows[0]?.ship ?? 0) / 100) * 1.1 * 100) / 100;
		const maxOrders = Number(await getSetting("MAX_RPI_ORDERS_PER_DAY")) || 5;
		return {
			ordersToday: n,
			exposureTodayUsd: exposure,
			maxOrders,
			maxExposure: Number(await getSetting("MAX_RPI_EXPOSURE_USD_PER_DAY")) || 550,
			resetsAt: w.resetsAt,
			result: capCheck({
				ordersToday: n,
				maxOrders
			})
		};
	}
	async function copiesTaken(excludeOrderId = null) {
		const w = windows();
		const where = TAKEN_SQL.replaceAll("$RES", "$1");
		const r = await sql.query(`select count(*)::int as n from store_orders where ${where} and ($2::text is null or id <> $2)`, [w.res, excludeOrderId]);
		return Number(r[0]?.n ?? 0);
	}
	/** Buyer-facing availability for /api/store/status, /book and the order page. */
	async function availability() {
		const taken = await copiesTaken();
		const caps = await capStatus(0);
		const editionRemaining = Math.max(0, 500 - taken);
		const countLeft = Math.max(0, caps.maxOrders - caps.ordersToday);
		const reason = editionRemaining === 0 ? "edition_sold_out" : countLeft === 0 ? "daily_count_reached" : null;
		return {
			editionSize: 500,
			editionRemaining,
			soldOut: editionRemaining === 0,
			dailyLimit: caps.maxOrders,
			dailyRemaining: reason ? 0 : Math.min(countLeft, editionRemaining),
			dailySoldOut: countLeft === 0,
			dailyCapReached: countLeft === 0,
			unavailableReason: reason,
			dailyResetsAt: caps.resetsAt
		};
	}
	async function quote(address) {
		const region = checkRegion(address.country, address.region);
		if (!region.ok) return {
			ok: false,
			status: 422,
			error: REGION_MESSAGES[region.reason]
		};
		if (!await salesOpen()) return {
			ok: false,
			status: 503,
			error: "Sales open soon."
		};
		const avail = await availability();
		if (avail.unavailableReason) return {
			ok: false,
			status: 409,
			error: REASON_TEXT[avail.unavailableReason],
			reason: avail.unavailableReason
		};
		if (!deps.rpi) return {
			ok: false,
			status: 503,
			error: "Shipping quotes are unavailable right now."
		};
		const r = await deps.rpi.shippingEstimate(address);
		if (r.kind === "http" && (r.status === 401 || r.status === 403)) {
			await tripKillSwitch("RPI auth failed (shipping estimate)");
			return {
				ok: false,
				status: 503,
				error: "Shipping quotes are unavailable right now."
			};
		}
		if (r.kind === "http" && r.status === 400) return {
			ok: false,
			status: 422,
			error: "Our printer can't ship to that address. Please check it."
		};
		if (r.kind !== "ok") return {
			ok: false,
			status: 502,
			error: "Shipping quotes are unavailable right now. Please try again."
		};
		if (r.data.length === 0) return {
			ok: false,
			status: 422,
			error: "No shipping options for that address."
		};
		const id = token();
		await sql.query("insert into store_quotes (id, address_json, options_json, created_at) values ($1, $2, $3, $4)", [
			id,
			JSON.stringify(address),
			JSON.stringify(r.data),
			now().toISOString()
		]);
		return {
			ok: true,
			quoteId: id,
			options: r.data
		};
	}
	async function checkout(quoteId, tier) {
		if (!await salesOpen()) return {
			ok: false,
			status: 503,
			error: "sales_closed"
		};
		if (!deps.stripe) return {
			ok: false,
			status: 503,
			error: "checkout_unavailable"
		};
		const q = (await sql.query("select * from store_quotes where id = $1", [quoteId]))[0];
		if (!q) return {
			ok: false,
			status: 404,
			error: "quote_not_found"
		};
		if (!quoteIsFresh(new Date(q.created_at), now())) return {
			ok: false,
			status: 410,
			error: "quote_expired"
		};
		const option = JSON.parse(q.options_json).find((o) => o.tier === tier);
		if (!option) return {
			ok: false,
			status: 422,
			error: "tier_unavailable"
		};
		const caps = await capStatus(option.priceUsd);
		if (!caps.result.ok) return {
			ok: false,
			status: 409,
			error: "daily_count_reached"
		};
		const address = JSON.parse(q.address_json);
		const orderToken = token();
		const w = windows();
		const taken = TAKEN_SQL.replaceAll("$RES", "$8");
		const today = TODAY_SQL.replaceAll("$DAY", "$7").replaceAll("$RES", "$8");
		if ((await sql.query(`insert into store_orders (id, state, quote_id, ship_tier, quoted_shipping_cents, address_json, created_at, stripe_session_id)
       select $1, 'CHECKOUT_OPEN', $2, $3, $4, $5, $6, 'pending:' || $1
       where (select count(*) from store_orders where ${taken}) < $9
         and (select count(*) from store_orders where ${today}) < $10
       returning id`, [
			orderToken,
			quoteId,
			tier,
			Math.round(option.priceUsd * 100),
			q.address_json,
			now().toISOString(),
			w.day,
			w.res,
			500,
			caps.maxOrders
		])).length === 0) {
			const a = await availability();
			return {
				ok: false,
				status: 409,
				error: a.unavailableReason ?? (a.soldOut ? "edition_sold_out" : "daily_count_reached")
			};
		}
		try {
			const customer = await deps.stripe.createCustomer(address, `cus-${orderToken}`);
			const session = await deps.stripe.createCheckoutSession(checkoutSessionParams({
				orderToken,
				quoteId,
				customerId: customer.id,
				option,
				baseUrl: deps.baseUrl
			}), `cs-${orderToken}`);
			await sql.query("update store_orders set stripe_session_id = $2, stripe_customer_id = $3, updated_at = now() where id = $1", [
				orderToken,
				session.id,
				customer.id
			]);
			return {
				ok: true,
				url: session.url
			};
		} catch {
			await sql.query("update store_orders set state = 'EXPIRED', stripe_session_id = null, last_error = 'stripe session failed' where id = $1", [orderToken]);
			return {
				ok: false,
				status: 502,
				error: "checkout_unavailable"
			};
		}
	}
	async function allocateOrderId(o) {
		if (o.customer_order_id) return o.customer_order_id;
		const r = await sql.query("update store_settings set value = (value::int + 1)::text where key = 'NEXT_ORDER_SEQ' returning ((value::int) - 1)::text as seq");
		const id = formatOrderId(Number(r[0]?.seq));
		o.customer_order_id = (await sql.query("update store_orders set customer_order_id = coalesce(customer_order_id, $2), updated_at = now() where id = $1 returning customer_order_id", [o.id, id]))[0]?.customer_order_id ?? id;
		return o.customer_order_id;
	}
	async function rpiCreate(o, actor) {
		if (!deps.rpi) {
			await transition(o, "HELD", actor, "RPI not configured");
			await alert("warn", "Order held: RPI_API_AUTH not set", o.id);
			return;
		}
		if (!await salesOpen()) {
			if (o.state !== "HELD") await transition(o, "HELD", actor, "sales off");
			return;
		}
		const pc = await deps.rpi.printCostPerCopy();
		if (pc.kind === "http" && (pc.status === 401 || pc.status === 403)) {
			await tripKillSwitch("RPI auth failed");
			if (o.state !== "HELD") await transition(o, "HELD", actor, "rpi auth failed");
			return;
		}
		if (pc.kind === "ok" && printCostTooHigh(pc.data)) {
			await tripKillSwitch(`RPI print cost $${pc.data.toFixed(2)} is above $140 per copy`);
			await transition(o, "NEEDS_ATTENTION", actor, "print cost above safety stop");
			return;
		}
		const id = await allocateOrderId(o);
		if (o.state !== "RPI_CREATING") await transition(o, "RPI_CREATING", actor, id);
		await sql.query("update store_orders set rpi_attempt = rpi_attempt + 1 where id = $1", [o.id]);
		o.rpi_attempt += 1;
		const address = JSON.parse(o.address_json ?? "{}");
		const body = createOrderBody({
			customerOrderId: id,
			tier: o.ship_tier ?? "standard",
			address,
			webhookUrl: `${deps.baseUrl}/api/store/rpi-webhook?o=${o.id}`,
			payload: JSON.stringify({
				s: o.stripe_session_id,
				t: o.id
			}),
			retailPriceUsd: (BOOK_PRICE_CENTS / 100).toFixed(2)
		});
		const out = await createWithGetBeforeRetry(deps.rpi, body);
		if (out.kind === "created" || out.kind === "adopted") {
			await transition(o, "RPI_CREATED", actor, out.kind, {
				rpi_next_retry_at: null,
				last_error: null
			});
			await syncFromRpi(o, actor);
			return;
		}
		if (out.kind === "auth_failed") {
			await tripKillSwitch("RPI auth failed (401/403)");
			await sql.query("update store_orders set rpi_next_retry_at = $2 where id = $1", [o.id, new Date(now().getTime() + 9e5).toISOString()]);
			return;
		}
		if (out.kind === "rejected") {
			await transition(o, "NEEDS_ATTENTION", actor, "rpi rejected create", { last_error: out.error });
			await alert("warn", `RPI refused order ${id}: ${out.error}`, o.id);
			return;
		}
		if (o.rpi_attempt >= 6) {
			await transition(o, "NEEDS_ATTENTION", actor, "create retries exhausted", { last_error: out.error });
			await alert("warn", `RPI create for ${id} failed ${o.rpi_attempt} times`, o.id);
			return;
		}
		const mins = RETRY_BACKOFF_MIN[Math.min(o.rpi_attempt - 1, RETRY_BACKOFF_MIN.length - 1)];
		await sql.query("update store_orders set rpi_next_retry_at = $2, last_error = $3 where id = $1", [
			o.id,
			new Date(now().getTime() + mins * 6e4).toISOString(),
			out.error
		]);
	}
	async function syncFromRpi(o, actor, full) {
		if (!deps.rpi || !o.customer_order_id) return;
		let data = full;
		if (!data) {
			const g = await deps.rpi.getOrder(o.customer_order_id);
			if (g.kind === "http" && (g.status === 401 || g.status === 403)) return tripKillSwitch("RPI auth failed (GET)");
			if (g.kind !== "ok") return;
			data = g.data;
		}
		const status = data.order?.status ?? null;
		await sql.query("update store_orders set rpi_status = $2, updated_at = now() where id = $1", [o.id, status]);
		const items = data.pricing?.itemsTotal;
		if (printCostTooHigh(items)) {
			await tripKillSwitch(`RPI item total $${items} above $140 per copy`);
			if (o.state !== "LOCKED" && o.state !== "SHIPPED") await deps.rpi.cancelOrder(o.customer_order_id);
			await transition(o, "NEEDS_ATTENTION", actor, "item total above safety stop");
			return;
		}
		const total = data.pricing?.orderTotal;
		if (rpiTotalTooHigh(total, o.amount_shipping_cents) && o.state !== "NEEDS_ATTENTION") {
			await alert("critical", `RPI total $${total} for ${o.customer_order_id} is above $145 + paid shipping + 15%; held. Cancel+Refund before RPI's 02:00 UTC charge or within the 2-hour holding bin if needed.`, o.id);
			await transition(o, "NEEDS_ATTENTION", actor, "rpi total above per-order limit");
			return;
		}
		const ship = data.pricing?.shippingTotal ?? data.selectedShipping?.price;
		if (o.amount_shipping_cents != null && shippingOverageTooHigh(ship, o.amount_shipping_cents) && o.state !== "NEEDS_ATTENTION") {
			await alert("warn", `RPI shipping $${ship} exceeds paid shipping by more than $2`, o.id);
			await transition(o, "NEEDS_ATTENTION", actor, "shipping overage");
			return;
		}
		if (status === "CANCELLED") return;
		const to = mapRpiStatus(status);
		if (!to || to === o.state || !isForward(o.state, to)) return;
		const extra = {};
		if (to === "LOCKED") extra.locked_at = now().toISOString();
		if (to === "SHIPPED") {
			extra.shipped_at = now().toISOString();
			const tracking = (data.shipmentTracking ?? []).flatMap((t) => t.trackingNumbers ?? []).map((t) => ({
				number: t.trackingNumber ?? null,
				url: t.trackingUrl ?? null
			}));
			extra.tracking_json = JSON.stringify(tracking);
		}
		if (to === "NEEDS_ATTENTION" || to === "PREFLIGHT_REJECTED" || to === "RPI_REJECTED") await alert(status === "REJECTED" ? "critical" : "warn", status === "REJECTED" ? `RPI rejected ${o.customer_order_id}: its order-limit queue was full. Not resubmitted; decide in admin.` : `RPI status ${status} for ${o.customer_order_id}`, o.id);
		await transition(o, to, actor, `rpi ${status}`, extra);
	}
	async function handleStripeEvent(event) {
		if ((await sql.query("insert into store_stripe_events (event_id, type) values ($1, $2) on conflict (event_id) do nothing returning event_id", [event.id, event.type])).length === 0) return { handled: "duplicate" };
		const obj = event.data.object;
		if (event.type === "checkout.session.expired") {
			const o = await getOrder(String(obj.metadata?.order_token ?? ""));
			if (o && o.state === "CHECKOUT_OPEN") await transition(o, "EXPIRED", "stripe");
			return { handled: "expired" };
		}
		if (event.type === "charge.dispute.created" || event.type === "radar.early_fraud_warning.created") {
			const n = await bump("disputes", 6048e5);
			await alert("critical", `Stripe ${event.type}`);
			if (n > 3) await tripKillSwitch("more than 3 disputes or fraud warnings in 7 days");
			return { handled: "dispute" };
		}
		if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") return { handled: "ignored" };
		if (!deps.stripe) return { handled: "no_stripe" };
		const sessionId = String(obj.id ?? "");
		const s = await deps.stripe.retrieveSession(sessionId);
		if (s.payment_status !== "paid") return { handled: "not_paid" };
		const o = await getOrder(String(s.metadata?.order_token ?? ""));
		if (!o || o.stripe_session_id !== s.id) return { handled: "no_order" };
		if (o.state !== "CHECKOUT_OPEN" && o.state !== "EXPIRED") return { handled: "already_processed" };
		const pi = typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id ?? null;
		const charge = typeof s.payment_intent === "object" ? s.payment_intent?.latest_charge : void 0;
		const risk = typeof charge === "object" ? charge?.outcome?.risk_level ?? null : null;
		const paidAt = now();
		const deadline = cancelDeadlineFor(paidAt);
		const shipCents = s.total_details?.amount_shipping ?? null;
		await transition(o, "PAID", "stripe", "", {
			stripe_payment_intent_id: pi,
			amount_subtotal_cents: s.amount_subtotal ?? null,
			amount_total_cents: s.amount_total ?? null,
			amount_tax_cents: s.total_details?.amount_tax ?? null,
			amount_shipping_cents: shipCents,
			paid_at: paidAt.toISOString(),
			cancel_deadline_utc: deadline.toISOString(),
			risk_level: risk
		});
		if (!subtotalIsExpected(s.amount_subtotal)) {
			await tripKillSwitch(`paid subtotal ${s.amount_subtotal} is not ${BOOK_PRICE_CENTS}`);
			await transition(o, "HELD", "stripe", "price mismatch");
			return { handled: "held_price" };
		}
		if (await copiesTaken(o.id) >= 500) {
			await alert("warn", "Paid after the edition sold out; refunded", o.id);
			await transition(o, "HELD", "stripe", "edition sold out");
			await refund(o, "stripe", "edition sold out: refunded");
			return { handled: "sold_out_refunded" };
		}
		if (shipCents !== o.quoted_shipping_cents) {
			await transition(o, "HELD", "stripe", "shipping amount differs from quote");
			await alert("warn", "Paid shipping differs from the quote; order held", o.id);
			return { handled: "held_shipping" };
		}
		const caps = await capStatus((shipCents ?? 0) / 100, o.id);
		const todayAll = await capStatus(0);
		if (exposureAlert(todayAll.exposureTodayUsd, todayAll.maxExposure)) await alert("info", `Today's estimated RPI spend is above the alert threshold ($${todayAll.maxExposure})`);
		if (!await salesOpen() || !caps.result.ok || risk === "elevated" || risk === "highest") {
			await transition(o, "HELD", "stripe", !caps.result.ok ? `cap ${caps.result.ok ? "" : caps.result.reason}` : risk ? `risk ${risk}` : "sales off");
			await alert("info", "Paid order held for review", o.id);
			return { handled: "held" };
		}
		if (isAfterTodayCutoff(paidAt)) {
			await transition(o, "DEFERRED", "stripe", "after 4 PM PT", { deferred_until_utc: nextPostChargeRunUtc(paidAt).toISOString() });
			return { handled: "deferred" };
		}
		await rpiCreate(o, "stripe");
		return { handled: o.state };
	}
	async function handleRpiWebhook(rawBody, orderToken) {
		const hash = createHash("sha256").update(rawBody).digest("hex");
		let cid = null;
		let source = "";
		try {
			const parsed = JSON.parse(rawBody);
			cid = parsed.data?.order?.customerOrderId ?? null;
			source = String(parsed.source ?? "");
		} catch {
			cid = null;
		}
		if ((await sql.query("insert into store_rpi_events (body_sha256, customer_order_id) values ($1, $2) on conflict (body_sha256) do nothing returning body_sha256", [hash, cid])).length === 0) return { handled: "duplicate" };
		let o = orderToken ? await getOrder(orderToken) : null;
		if (!o && cid) o = (await sql.query("select * from store_orders where customer_order_id = $1", [cid]))[0] ?? null;
		if (source === "PaymentFailure") await alert("critical", "RPI card payment failed; RPI retries the next day. Check the card on the RPI dashboard.", o?.id ?? null);
		if (source === "PaymentSuccessful") await audit(o?.id ?? null, null, null, "rpi", "PaymentSuccessful");
		if (!o || !o.customer_order_id) return { handled: source ? `account:${source}` : "unknown_order" };
		if (source === "OrderOverLimitQueued") {
			await audit(o.id, o.state, o.state, "rpi", "OrderOverLimitQueued: waiting in RPI's limit queue");
			await alert("info", `${o.customer_order_id} is waiting in RPI's order-limit queue`, o.id);
		}
		if (source === "OrderExitedLimitQueue") await audit(o.id, o.state, o.state, "rpi", "OrderExitedLimitQueue");
		if (source === "OrderExceedsLimitQueue") {
			await alert("critical", `RPI rejected ${o.customer_order_id}: limit queue full. Not resubmitted.`, o.id);
			if (o.state !== "NEEDS_ATTENTION") await transition(o, "NEEDS_ATTENTION", "rpi", "OrderExceedsLimitQueue");
		}
		await syncFromRpi(o, "rpi");
		return { handled: o.state };
	}
	async function refund(o, actor, note) {
		if (!deps.stripe || !o.stripe_payment_intent_id) {
			await transition(o, "NEEDS_ATTENTION", actor, "refund not possible automatically");
			return;
		}
		await deps.stripe.refund(o.stripe_payment_intent_id, `refund-${o.id}`);
		await transition(o, "CANCELLED_REFUNDED", actor, note);
	}
	async function customerCancel(orderToken) {
		const o = await getOrder(orderToken);
		if (!o) return {
			ok: false,
			error: "not_found"
		};
		if (!customerCanCancel(o.state, asDate(o.cancel_deadline_utc), now())) return {
			ok: false,
			error: "not_cancellable"
		};
		return cancelOrder(o, "customer");
	}
	async function cancelOrder(o, actor) {
		if (!o.customer_order_id || o.state === "PAID" || o.state === "DEFERRED" || o.state === "HELD") {
			if (o.customer_order_id && deps.rpi) {
				if ((await deps.rpi.getOrder(o.customer_order_id)).kind === "ok") return cancelAtRpi(o, actor);
			}
			await refund(o, actor, "cancelled before RPI order");
			return {
				ok: true,
				state: o.state
			};
		}
		return cancelAtRpi(o, actor);
	}
	async function cancelAtRpi(o, actor) {
		if (!deps.rpi || !o.customer_order_id) return {
			ok: false,
			error: "rpi_unavailable"
		};
		const r = await deps.rpi.cancelOrder(o.customer_order_id);
		const status = r.kind === "ok" ? r.data.status ?? r.data.order?.status : null;
		if (r.kind === "ok" && status === "CANCELLED") {
			await refund(o, actor, "cancelled at RPI");
			return {
				ok: true,
				state: o.state
			};
		}
		if (o.state !== "CANCEL_REQUESTED") await transition(o, "CANCEL_REQUESTED", actor, `rpi cancel ${status ?? (r.kind === "http" ? r.status : r.kind)}`);
		return {
			ok: true,
			state: o.state
		};
	}
	async function requestReprint(orderToken, description) {
		const o = await getOrder(orderToken);
		if (!o || o.state !== "SHIPPED") return {
			ok: false,
			error: "not_eligible"
		};
		const id = token();
		await sql.query("insert into store_reprint_requests (id, order_id, description) values ($1, $2, $3)", [
			id,
			o.id,
			description.slice(0, 2e3)
		]);
		await alert("warn", "Reprint request received", o.id);
		return { ok: true };
	}
	async function reconcile() {
		const t = now().toISOString();
		const due = await sql.query("select * from store_orders where state = 'RPI_CREATING' and (rpi_next_retry_at is null or rpi_next_retry_at <= $1) order by created_at limit 10", [t]);
		for (const o of due) await rpiCreate(o, "cron");
		const active = await sql.query("select * from store_orders where state in ('RPI_CREATED','CANCEL_WINDOW','LOCKED','CANCEL_REQUESTED') and customer_order_id is not null order by updated_at limit 25");
		for (const o of active) if (o.state === "CANCEL_REQUESTED") await cancelAtRpi(o, "cron");
		else await syncFromRpi(o, "cron");
		return {
			retried: due.length,
			synced: active.length
		};
	}
	async function releaseDeferred() {
		const due = await sql.query("select * from store_orders where state = 'DEFERRED' and deferred_until_utc <= $1 order by paid_at limit 10", [now().toISOString()]);
		for (const o of due) {
			const caps = await capStatus((o.amount_shipping_cents ?? 0) / 100, o.id);
			if (!await salesOpen() || !caps.result.ok) {
				await transition(o, "HELD", "cron", "sales off or cap at release");
				continue;
			}
			await rpiCreate(o, "cron");
		}
		return { released: due.length };
	}
	async function daily() {
		await sql.query("delete from store_quotes where created_at < $1 and id not in (select quote_id from store_orders where quote_id is not null)", [(/* @__PURE__ */ new Date(now().getTime() - 864e5)).toISOString()]);
		const stuck = await sql.query("select count(*)::int as n from store_orders where state in ('HELD','NEEDS_ATTENTION')");
		if (Number(stuck[0]?.n) > 0) await alert("info", `${stuck[0]?.n} order(s) need review`);
		return { ok: true };
	}
	async function adminRelease(orderId) {
		const o = await getOrder(orderId);
		if (!o || o.state !== "HELD" && o.state !== "NEEDS_ATTENTION") return {
			ok: false,
			error: "not_releasable"
		};
		if (!await salesOpen()) return {
			ok: false,
			error: "sales_off"
		};
		await rpiCreate(o, "admin");
		return {
			ok: true,
			state: o.state
		};
	}
	async function adminCancelRefund(orderId) {
		const o = await getOrder(orderId);
		if (!o || [
			"CANCELLED_REFUNDED",
			"EXPIRED",
			"CHECKOUT_OPEN",
			"SHIPPED"
		].includes(o.state)) return {
			ok: false,
			error: "not_cancellable"
		};
		return cancelOrder(o, "admin");
	}
	return {
		getSetting,
		setSetting,
		salesOpen,
		tripKillSwitch,
		noteBadSignature,
		alert,
		getOrder,
		capStatus,
		availability,
		copiesTaken,
		quote,
		checkout,
		rpiCreate,
		syncFromRpi,
		handleStripeEvent,
		handleRpiWebhook,
		customerCancel,
		requestReprint,
		reconcile,
		releaseDeferred,
		daily,
		adminRelease,
		adminCancelRefund
	};
}
/** Wires the store service to the real DB, RPI and Stripe. Server-only. */
async function getStore() {
	const sql = await getSql();
	const auth = storeEnv.rpiApiAuth();
	const key = storeEnv.stripeSecretKey();
	return createStore({
		sql,
		rpi: auth ? createRpiClient({
			baseUrl: storeEnv.rpiBaseUrl(),
			auth
		}) : null,
		stripe: key ? createStripeClient({ secretKey: key }) : null,
		baseUrl: storeEnv.publicBaseUrl()
	});
}
function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
var Body$1 = object({
	quoteId: string().min(10).max(64),
	tier: _enum([
		"standard",
		"expedited",
		"rush"
	])
});
var Route$9 = createFileRoute("/api/store/checkout")({ server: { handlers: { POST: async ({ request }) => {
	const parsed = Body$1.safeParse(await request.json().catch(() => null));
	if (!parsed.success) return json({ error: "bad_request" }, 400);
	const r = await (await getStore()).checkout(parsed.data.quoteId, parsed.data.tier);
	if (!r.ok) return json({ error: r.error }, r.status);
	return json({ url: r.url });
} } } });
var AddressSchema = object({
	name: string().trim().min(1).max(200),
	address1: string().trim().min(1).max(200),
	address2: string().trim().max(200).optional().default(""),
	city: string().trim().min(1).max(100),
	region: string().trim().min(1).max(50),
	postal: string().trim().min(2).max(20),
	country: string().trim().length(2),
	email: string().trim().email().max(200),
	phone: string().trim().max(40).optional().default("")
});
var Route$8 = createFileRoute("/api/store/quote")({ server: { handlers: { POST: async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	const parsed = AddressSchema.safeParse(body);
	if (!parsed.success) return json({ error: "Please check the address fields." }, 400);
	const r = await (await getStore()).quote(parsed.data);
	if (!r.ok) return json({
		error: r.error,
		...r.reason ? { reason: r.reason } : {}
	}, r.status);
	return json({
		quoteId: r.quoteId,
		options: r.options
	});
} } } });
function safeEq(a, b) {
	return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}
/**
* Verify a Stripe-Signature header (t=...,v1=...) over the raw body.
* Tolerance defaults to 300 s like Stripe's SDK.
*/
function verifyStripeSignature(rawBody, header, secret, nowSec = Math.floor(Date.now() / 1e3), toleranceSec = 300) {
	if (!header || !secret) return false;
	let t = "";
	const v1 = [];
	for (const part of header.split(",")) {
		const [k, v] = part.split("=", 2);
		if (k?.trim() === "t") t = (v ?? "").trim();
		if (k?.trim() === "v1" && v) v1.push(v.trim());
	}
	const ts = Number(t);
	if (!t || !Number.isFinite(ts) || v1.length === 0) return false;
	if (Math.abs(nowSec - ts) > toleranceSec) return false;
	const expected = createHmac("sha256", secret).update(`${t}.${rawBody}`, "utf8").digest();
	return v1.some((sig) => /^[0-9a-f]+$/i.test(sig) && safeEq(Buffer.from(sig, "hex"), expected));
}
/** RPI: base64 HMAC-SHA256 of the raw body in header x-rpi-printapi-hmac-sha256. */
function verifyRpiSignature(rawBody, header, secret) {
	if (!header || !secret) return false;
	const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
	let got;
	try {
		got = Buffer.from(header.trim(), "base64");
	} catch {
		return false;
	}
	return safeEq(got, expected);
}
/**
* Cron calls: headers x-cron-ts (unix seconds) and x-cron-sig =
* hex HMAC-SHA256(CRON_SECRET, `${ts}.${job}`), 5-minute window.
*/
function signCron(job, ts, secret) {
	return createHmac("sha256", secret).update(`${ts}.${job}`, "utf8").digest("hex");
}
function verifyCron(job, tsHeader, sigHeader, secret, nowSec = Math.floor(Date.now() / 1e3)) {
	if (!secret || !tsHeader || !sigHeader || !/^[0-9a-f]{64}$/i.test(sigHeader)) return false;
	const ts = Number(tsHeader);
	if (!Number.isInteger(ts) || Math.abs(nowSec - ts) > 300) return false;
	return safeEq(Buffer.from(sigHeader, "hex"), Buffer.from(signCron(job, ts, secret), "hex"));
}
var Route$7 = createFileRoute("/api/store/rpi-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const raw = await request.text();
	const store = await getStore();
	if (!verifyRpiSignature(raw, request.headers.get("x-rpi-printapi-hmac-sha256"), storeEnv.rpiWebhookSecret())) {
		console.warn("[store] rpi signature failed");
		await store.noteBadSignature("rpi");
		return json({ error: "bad signature" }, 401);
	}
	try {
		const r = await store.handleRpiWebhook(raw, new URL(request.url).searchParams.get("o"));
		console.info(`[store] rpi webhook -> ${r.handled}`);
	} catch (err) {
		console.error(`[store] rpi webhook failed: ${err.message}`);
	}
	return json({ received: true });
} } } });
var Route$6 = createFileRoute("/api/store/status")({ server: { handlers: { GET: async () => {
	const store = await getStore();
	return json({
		salesOpen: await store.salesOpen(),
		...await store.availability()
	});
} } } });
var Route$5 = createFileRoute("/api/store/stripe-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const raw = await request.text();
	const store = await getStore();
	if (!verifyStripeSignature(raw, request.headers.get("stripe-signature"), storeEnv.stripeWebhookSecret())) {
		console.warn("[store] stripe signature failed");
		await store.noteBadSignature("stripe");
		return json({ error: "bad signature" }, 400);
	}
	const event = JSON.parse(raw);
	try {
		const r = await store.handleStripeEvent(event);
		console.info(`[store] stripe ${event.type} ${event.id} -> ${r.handled}`);
		return json({ received: true });
	} catch (err) {
		console.error(`[store] stripe ${event.type} ${event.id} failed: ${err.message}`);
		return json({ error: "retry" }, 500);
	}
} } } });
/** Admin check for API routes: the site's existing eom_admin cookie. */
function isAdminRequestFrom(request) {
	if (!ADMIN_USER || !ADMIN_PASS) return false;
	const m = (request.headers.get("cookie") ?? "").match(new RegExp(`(?:^|; )${ADMIN_COOKIE}=([^;]*)`));
	const got = m?.[1] ? decodeURIComponent(m[1]) : "";
	return got !== "" && safeEqual(got, adminToken());
}
function notFound$1() {
	return new Response("Not Found", {
		status: 404,
		headers: { "cache-control": "no-store" }
	});
}
var Body = discriminatedUnion("action", [
	object({
		action: literal("setSales"),
		enabled: boolean()
	}),
	object({
		action: literal("setCaps"),
		maxOrders: number().int().min(0).max(100),
		maxExposureUsd: number().min(0).max(2e4)
	}),
	object({
		action: literal("release"),
		orderId: string().min(10)
	}),
	object({
		action: literal("cancelRefund"),
		orderId: string().min(10)
	}),
	object({
		action: literal("resolveAlert"),
		alertId: number().int()
	}),
	object({
		action: literal("decideReprint"),
		requestId: string().min(10),
		decision: _enum(["approved", "declined"])
	})
]);
var Route$4 = createFileRoute("/api/store/admin/action")({ server: { handlers: { POST: async ({ request }) => {
	if (!isAdminRequestFrom(request)) return notFound$1();
	const parsed = Body.safeParse(await request.json().catch(() => null));
	if (!parsed.success) return json({ error: "bad_request" }, 400);
	const store = await getStore();
	const sql = await getSql();
	const b = parsed.data;
	switch (b.action) {
		case "setSales":
			await store.setSetting("ORDERS_ENABLED", b.enabled ? "true" : "false");
			if (b.enabled) await store.setSetting("KILL_REASON", "");
			await store.alert("info", `Sales turned ${b.enabled ? "ON" : "OFF"} by admin`);
			return json({ ok: true });
		case "setCaps":
			await store.setSetting("MAX_RPI_ORDERS_PER_DAY", String(b.maxOrders));
			await store.setSetting("MAX_RPI_EXPOSURE_USD_PER_DAY", String(b.maxExposureUsd));
			return json({ ok: true });
		case "release": return json(await store.adminRelease(b.orderId));
		case "cancelRefund": return json(await store.adminCancelRefund(b.orderId));
		case "resolveAlert":
			await sql.query("update store_alerts set resolved = true where id = $1", [b.alertId]);
			return json({ ok: true });
		case "decideReprint":
			await sql.query("update store_reprint_requests set decision = $2, decided_at = now() where id = $1", [b.requestId, b.decision]);
			return json({ ok: true });
	}
} } } });
async function headOk(url) {
	try {
		return (await fetch(url, {
			method: "HEAD",
			signal: AbortSignal.timeout(5e3)
		})).status === 200;
	} catch {
		return false;
	}
}
/** Booleans only. Never returns a key, token, email or address. */
var Route$3 = createFileRoute("/api/store/admin/health")({ server: { handlers: { GET: async ({ request }) => {
	if (!isAdminRequestFrom(request)) return notFound$1();
	let dbReachable = false;
	try {
		await (await getSql()).query("select 1 from store_settings limit 1");
		dbReachable = true;
	} catch {
		dbReachable = false;
	}
	const store = await getStore();
	const key = storeEnv.stripeSecretKey();
	const auth = storeEnv.rpiApiAuth();
	const rpiPing = auth ? await createRpiClient({
		baseUrl: storeEnv.rpiBaseUrl(),
		auth
	}).ping() : { ok: false };
	const [interiorOk, coverOk] = await Promise.all([headOk(RPI_INTERIOR_URL), headOk(RPI_COVER_URL)]);
	return json({
		secretsSet: storeEnvStatus(),
		databaseIsNeon: Boolean(process.env.DATABASE_URL?.trim()),
		dbReachable,
		stripeKeyIsLive: key.startsWith("sk_live_") || key.startsWith("rk_live_"),
		stripeWebhookSecretLooksValid: storeEnv.stripeWebhookSecret().startsWith("whsec_"),
		rpiPingOk: rpiPing.ok,
		rpiWebhookSecretSet: storeEnv.rpiWebhookSecret() !== "",
		printFilesOk: {
			interior: interiorOk,
			cover: coverOk
		},
		ordersEnabled: await store.salesOpen(),
		killReasonSet: await store.getSetting("KILL_REASON") !== ""
	});
} } } });
var Route$2 = createFileRoute("/api/store/admin/overview")({ server: { handlers: { GET: async ({ request }) => {
	if (!isAdminRequestFrom(request)) return notFound$1();
	const store = await getStore();
	const sql = await getSql();
	const orders = await sql.query("select id, state, ship_tier, customer_order_id, rpi_status, amount_total_cents, paid_at, cancel_deadline_utc, last_error, created_at from store_orders where state not in ('CHECKOUT_OPEN','EXPIRED') order by created_at desc limit 100");
	const alerts = await sql.query("select id, level, message, order_id, at from store_alerts where resolved = false order by at desc limit 50");
	const reprints = await sql.query("select id, order_id, description, decision, created_at from store_reprint_requests order by created_at desc limit 50");
	const caps = await store.capStatus(0);
	return json({
		ordersEnabled: await store.salesOpen(),
		killReason: await store.getSetting("KILL_REASON"),
		maxOrdersPerDay: caps.maxOrders,
		maxExposureUsdPerDay: caps.maxExposure,
		ordersToday: caps.ordersToday,
		exposureTodayUsd: caps.exposureTodayUsd,
		availability: await store.availability(),
		nextOrderSeq: await store.getSetting("NEXT_ORDER_SEQ"),
		orders: orders.map((o) => ({
			...o,
			short: String(o.id).slice(0, 8)
		})),
		alerts,
		reprints
	});
} } } });
var JOBS = /* @__PURE__ */ new Set([
	"reconcile",
	"release",
	"daily"
]);
/** Signed cron calls from Max's Cloudflare Worker (see docs/store-cron-worker.js). */
var Route$1 = createFileRoute("/api/store/cron/$job")({ server: { handlers: { POST: async ({ params, request }) => {
	const job = params.job;
	if (!JOBS.has(job) || !verifyCron(job, request.headers.get("x-cron-ts"), request.headers.get("x-cron-sig"), storeEnv.cronSecret())) return new Response("Not Found", { status: 404 });
	const store = await getStore();
	if (job === "reconcile") return json(await store.reconcile());
	if (job === "release") return json(await store.releaseDeferred());
	const out = await store.daily();
	for (const url of [RPI_INTERIOR_URL, RPI_COVER_URL]) {
		const r = await fetch(url, {
			method: "HEAD",
			signal: AbortSignal.timeout(8e3)
		}).catch(() => null);
		if (!r || r.status !== 200) await store.tripKillSwitch("a print file did not return HTTP 200");
	}
	return json(out);
} } } });
/** Public order status by unguessable token. Shows no address beyond city/country. */
var Route = createFileRoute("/api/store/order/$token")({ server: { handlers: {
	GET: async ({ params }) => {
		const store = await getStore();
		const o = await store.getOrder(params.token);
		if (!o || o.state === "CHECKOUT_OPEN" || o.state === "EXPIRED") return json({ error: "not_found" }, 404);
		const addr = JSON.parse(o.address_json ?? "{}");
		const deadline = o.cancel_deadline_utc ? new Date(o.cancel_deadline_utc) : null;
		return json({
			state: o.state,
			tier: o.ship_tier,
			shipTo: [addr.city, addr.country].filter(Boolean).join(", "),
			totalCents: o.amount_total_cents,
			cancelDeadline: deadline?.toISOString() ?? null,
			canCancel: customerCanCancel(o.state, deadline, /* @__PURE__ */ new Date()),
			tracking: o.tracking_json ? JSON.parse(o.tracking_json) : [],
			canRequestReprint: o.state === "SHIPPED",
			rpiQueued: o.rpi_status === "QUEUED",
			availability: await store.availability()
		});
	},
	POST: async ({ params, request }) => {
		const body = await request.json().catch(() => ({}));
		const store = await getStore();
		if (body.action === "cancel") {
			const r = await store.customerCancel(params.token);
			return json(r, r.ok ? 200 : 409);
		}
		if (body.action === "reprint" && typeof body.description === "string" && body.description.trim().length >= 10) {
			const r = await store.requestReprint(params.token, body.description.trim());
			return json(r, r.ok ? 200 : 409);
		}
		return json({ error: "bad_request" }, 400);
	}
} } });
var rootRouteChildren = {
	IndexRoute: Route$26.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$27
	}),
	AboutRoute: Route$25.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$27
	}),
	BookRoute: Route$24.update({
		id: "/book",
		path: "/book",
		getParentRoute: () => Route$27
	}),
	TermsRoute: Route$23.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$27
	}),
	TryRoute: Route$22.update({
		id: "/try",
		path: "/try",
		getParentRoute: () => Route$27
	}),
	TrySecretRoute: Route$21.update({
		id: "/try-secret",
		path: "/try-secret",
		getParentRoute: () => Route$27
	}),
	AdminStoreRoute: Route$20.update({
		id: "/admin/store",
		path: "/admin/store",
		getParentRoute: () => Route$27
	}),
	ApiFanImageRoute: Route$19.update({
		id: "/api/fan-image",
		path: "/api/fan-image",
		getParentRoute: () => Route$27
	}),
	ApiFanVideoRoute: Route$18.update({
		id: "/api/fan-video",
		path: "/api/fan-video",
		getParentRoute: () => Route$27
	}),
	ApiImageRoute: Route$17.update({
		id: "/api/image",
		path: "/api/image",
		getParentRoute: () => Route$27
	}),
	ApiOgPreviewRoute: Route$16.update({
		id: "/api/og-preview",
		path: "/api/og-preview",
		getParentRoute: () => Route$27
	}),
	ApiRepinRoute: Route$15.update({
		id: "/api/repin",
		path: "/api/repin",
		getParentRoute: () => Route$27
	}),
	ApiSvgReelRoute: Route$14.update({
		id: "/api/svg-reel",
		path: "/api/svg-reel",
		getParentRoute: () => Route$27
	}),
	FanIdRoute: Route$13.update({
		id: "/fan/$id",
		path: "/fan/$id",
		getParentRoute: () => Route$27
	}),
	OrderTokenRoute: Route$12.update({
		id: "/order/$token",
		path: "/order/$token",
		getParentRoute: () => Route$27
	}),
	PlateSlugRoute: Route$11.update({
		id: "/plate/$slug",
		path: "/plate/$slug",
		getParentRoute: () => Route$27
	}),
	SvgIdRoute: Route$10.update({
		id: "/svg/$id",
		path: "/svg/$id",
		getParentRoute: () => Route$27
	}),
	ApiStoreCheckoutRoute: Route$9.update({
		id: "/api/store/checkout",
		path: "/api/store/checkout",
		getParentRoute: () => Route$27
	}),
	ApiStoreQuoteRoute: Route$8.update({
		id: "/api/store/quote",
		path: "/api/store/quote",
		getParentRoute: () => Route$27
	}),
	ApiStoreRpiWebhookRoute: Route$7.update({
		id: "/api/store/rpi-webhook",
		path: "/api/store/rpi-webhook",
		getParentRoute: () => Route$27
	}),
	ApiStoreStatusRoute: Route$6.update({
		id: "/api/store/status",
		path: "/api/store/status",
		getParentRoute: () => Route$27
	}),
	ApiStoreStripeWebhookRoute: Route$5.update({
		id: "/api/store/stripe-webhook",
		path: "/api/store/stripe-webhook",
		getParentRoute: () => Route$27
	}),
	ApiStoreAdminActionRoute: Route$4.update({
		id: "/api/store/admin/action",
		path: "/api/store/admin/action",
		getParentRoute: () => Route$27
	}),
	ApiStoreAdminHealthRoute: Route$3.update({
		id: "/api/store/admin/health",
		path: "/api/store/admin/health",
		getParentRoute: () => Route$27
	}),
	ApiStoreAdminOverviewRoute: Route$2.update({
		id: "/api/store/admin/overview",
		path: "/api/store/admin/overview",
		getParentRoute: () => Route$27
	}),
	ApiStoreCronJobRoute: Route$1.update({
		id: "/api/store/cron/$job",
		path: "/api/store/cron/$job",
		getParentRoute: () => Route$27
	}),
	ApiStoreOrderTokenRoute: Route.update({
		id: "/api/store/order/$token",
		path: "/api/store/order/$token",
		getParentRoute: () => Route$27
	})
};
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { fileStem as A, suggestedPlates as B, DENSITY_STEPS as C, downloadJpeg as D, createLiveRenderer as E, artists as F, filterPlates as I, formatYear as L, mosaicToSvg as M, parseEmojiGrid as N, downloadText as O, renderMosaic as P, plateCount as R, BuyNow as S, copyText as T, TIER_LABEL as _, Route$12 as a, MosaicCanvas as b, CANCEL_CUTOFF_LABEL as c, REASON_TEXT as d, SELLER_NAME as f, TEXT_SHIPPING_DUTIES as g, TEXT_REFUND as h, Route$11 as i, glyphsToText as j, ensurePalette as k, CONTACT_EMAIL as l, TERMS_EFFECTIVE_DATE as m, ENABLED_COUNTRIES as n, Route$13 as o, STORE_NAME as p, Route$10 as r, BOOK_PRICE_CENTS as s, router_exports as t, QUOTE_TTL_MS as u, Route$26 as v, canvasToJpegBase64 as w, loadFromFile as x, paintingSrc as y, plates as z };

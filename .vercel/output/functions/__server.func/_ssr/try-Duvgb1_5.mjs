import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as publishFanWork } from "./fan-works-BMoXMERl.mjs";
import { _ as letterboxReelFrame, g as framesToAnimatedSvg, h as downloadSvg, m as SVG_DENSITY_STEPS, p as SVG_CLIP_MS, s as publishSvgReel, y as packReelFrames } from "./svg-reels-D4HEG8-k.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { a as Save, t as Upload } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as fileStem, E as createLiveRenderer, P as renderMosaic, b as MosaicCanvas, j as glyphsToText, k as ensurePalette, w as canvasToJpegBase64, x as loadFromFile } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as Input } from "./input-B6LEBlYf.mjs";
import { r as IpfsCopy } from "./ipfs-copy-Cnhc40SN.mjs";
import { a as jpegToDataUrl, n as dataUrlToJpeg, o as letterboxOgDataUrl, r as grabBlobMiddleFrame, t as MosaicExport } from "./clip-poster-DPXq7yeC.mjs";
import { t as ShareWork } from "./share-work-CWb2FJ1n.mjs";
import { t as DensityControl } from "./density-control-CjeO0SOG.mjs";
import { _ as requestFullscreenEl, a as SvgReelPlayer, c as downloadBlob, d as isDesktopLive, f as isIosLive, g as readLiveDensity, h as pickRecorderMime, i as SvgIpfsLinks, l as downloadReelVideo, m as liveFpsFor, n as EncodeSpin, o as VideoEncodeWait, p as liveDensitySteps, r as LIVE_DENSITY_STEPS, s as blobToBase64, t as CLIP_MS, u as exitFullscreenSafe, v as videoExt, y as writeLiveDensity } from "./svg-4k-MdUCP9xy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/try-Duvgb1_5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OgSharePreview({ jpeg, readySrc, className }) {
	const [src, setSrc] = (0, import_react.useState)(readySrc ?? null);
	(0, import_react.useEffect)(() => {
		if (readySrc) {
			setSrc(readySrc);
			return;
		}
		if (!jpeg) {
			setSrc(null);
			return;
		}
		let live = true;
		setSrc(null);
		letterboxOgDataUrl(jpeg).then((url) => {
			if (live) setSrc(url);
		}).catch(() => {
			if (live) setSrc(jpegToDataUrl(jpeg));
		});
		return () => {
			live = false;
		};
	}, [jpeg, readySrc]);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex aspect-[1200/630] items-center justify-center rounded-lg bg-surface-2 text-sm text-muted", className),
		children: "Building share preview…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-lg bg-surface-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 pt-2.5 text-xs font-semibold tracking-wide text-muted uppercase",
			children: "Share preview"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "How this looks when the link is shared",
			className: "mt-2 block aspect-[1200/630] w-full object-cover"
		})]
	});
}
function notifyAddedToFans(title) {
	toast.success("Added to Fans", {
		description: title?.trim() ? `${title.trim()} is on the wall.` : "Your emoji mosaic is on the wall.",
		duration: 2800
	});
}
function notifyAddedSvgReel(title) {
	toast.success("Added to Fans", {
		description: title?.trim() ? `${title.trim()} is on the wall — experimental SVG reel.` : "Your experimental SVG reel is on the Fans wall.",
		duration: 2800
	});
}
function CameraStudio({ open, onClose, onSaved }) {
	const navigate = useNavigate();
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const liveRef = (0, import_react.useRef)(createLiveRenderer());
	const paletteRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const recorderRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const gridRef = (0, import_react.useRef)(null);
	const facingRef = (0, import_react.useRef)("environment");
	const densityRef = (0, import_react.useRef)(48);
	const recordingRef = (0, import_react.useRef)(false);
	const finishingRef = (0, import_react.useRef)(false);
	const firstJpegRef = (0, import_react.useRef)(null);
	const snapshotsRef = (0, import_react.useRef)([]);
	const [error, setError] = (0, import_react.useState)(null);
	const [density, setDensityState] = (0, import_react.useState)(48);
	const [steps, setSteps] = (0, import_react.useState)(LIVE_DENSITY_STEPS);
	const [facing, setFacing] = (0, import_react.useState)("environment");
	const [grid, setGrid] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [remainMs, setRemainMs] = (0, import_react.useState)(CLIP_MS);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [wake, setWake] = (0, import_react.useState)(0);
	densityRef.current = density;
	facingRef.current = facing;
	recordingRef.current = recording;
	const setDensity = (next) => {
		setDensityState(next);
		writeLiveDensity(next);
	};
	(0, import_react.useEffect)(() => {
		const next = liveDensitySteps();
		setSteps(next);
		setDensityState(readLiveDensity());
	}, []);
	const stopStream = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
	}, []);
	const startStream = (0, import_react.useCallback)(async (mode) => {
		stopStream();
		const desktop = isDesktopLive();
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: desktop ? {
				facingMode: { ideal: mode },
				width: {
					ideal: 640,
					max: 1280
				},
				height: {
					ideal: 360,
					max: 720
				},
				frameRate: {
					ideal: 24,
					max: 30
				}
			} : {
				facingMode: { ideal: mode },
				frameRate: {
					ideal: 24,
					max: 30
				}
			}
		});
		streamRef.current = stream;
		const video = videoRef.current;
		if (video) {
			video.srcObject = stream;
			video.muted = true;
			video.playsInline = true;
			await video.play();
		}
	}, [stopStream]);
	const resumeLive = (0, import_react.useCallback)(async () => {
		if (!open) return;
		const stream = streamRef.current;
		const dead = !stream || stream.getVideoTracks().every((track) => track.readyState !== "live");
		try {
			if (dead) await startStream(facingRef.current);
			else await videoRef.current?.play();
		} catch {
			try {
				await startStream(facingRef.current);
			} catch {
				setError("Camera paused. Tap 🔄 to wake it.");
			}
		}
		setWake((n) => n + 1);
	}, [open, startStream]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		setError(null);
		setDraft(null);
		setTitle("");
		setRecording(false);
		setRemainMs(CLIP_MS);
		(async () => {
			try {
				await startStream(facingRef.current);
			} catch {
				if (alive) setError("Camera permission is needed for a live mosaic.");
			}
		})();
		return () => {
			alive = false;
			stopStream();
		};
	}, [
		open,
		startStream,
		stopStream
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const wakeUp = () => {
			if (document.visibilityState === "hidden") return;
			resumeLive();
		};
		document.addEventListener("visibilitychange", wakeUp);
		window.addEventListener("focus", wakeUp);
		window.addEventListener("pageshow", wakeUp);
		return () => {
			document.removeEventListener("visibilitychange", wakeUp);
			window.removeEventListener("focus", wakeUp);
			window.removeEventListener("pageshow", wakeUp);
		};
	}, [open, resumeLive]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		ensurePalette().then((palette) => {
			if (alive) paletteRef.current = palette;
		});
		return () => {
			alive = false;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		let raf = 0;
		let last = 0;
		const loop = (stamp) => {
			if (!alive) return;
			raf = requestAnimationFrame(loop);
			if (stamp - last < 1e3 / liveFpsFor(densityRef.current)) return;
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const wrap = wrapRef.current;
			const palette = paletteRef.current;
			if (!video || !canvas || !wrap || !palette || video.readyState < 2) return;
			if (!video.videoWidth) return;
			last = stamp;
			const info = liveRef.current.draw({
				canvas,
				video,
				wrapW: wrap.clientWidth || 360,
				wrapH: wrap.clientHeight || 640,
				density: densityRef.current,
				palette,
				capture: false
			});
			gridRef.current = info;
			setGrid((prev) => prev && prev.cols === info.cols && prev.rows === info.rows ? prev : info);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
		};
	}, [open, wake]);
	const flipCamera = async () => {
		if (recording) return;
		const next = facing === "user" ? "environment" : "user";
		setFacing(next);
		try {
			await startStream(next);
		} catch {
			setError("Could not switch cameras.");
		}
	};
	const finishClip = (0, import_react.useCallback)(async (blob, mime) => {
		if (finishingRef.current) return;
		finishingRef.current = true;
		recorderRef.current = null;
		recordingRef.current = false;
		const canvas = canvasRef.current;
		let info = gridRef.current;
		const video = videoRef.current;
		const wrap = wrapRef.current;
		const palette = paletteRef.current;
		if (canvas && video && wrap && palette) {
			info = liveRef.current.draw({
				canvas,
				video,
				wrapW: wrap.clientWidth || 360,
				wrapH: wrap.clientHeight || 640,
				density: densityRef.current,
				palette,
				capture: true
			});
			gridRef.current = info;
		}
		if (!canvas || !info) {
			finishingRef.current = false;
			setRecording(false);
			setError("Nothing to save — try recording again.");
			return;
		}
		try {
			const fromVideo = blob.size > 64 ? await grabBlobMiddleFrame(blob) : null;
			const snaps = snapshotsRef.current;
			const midSnap = snaps.length ? snaps[Math.floor(snaps.length / 2)] : null;
			const raw = (fromVideo ? dataUrlToJpeg(fromVideo) : null) || midSnap || firstJpegRef.current || await canvasToJpegBase64(canvas, isDesktopLive() ? 1200 : 960, .8);
			const ogJpeg = await letterboxOgDataUrl(raw).catch(() => jpegToDataUrl(raw));
			setDraft({
				blob,
				mime,
				grid: info,
				jpeg: raw,
				ogJpeg
			});
		} catch {
			setError("Could not freeze that frame. Try again.");
		}
		setRecording(false);
		setRemainMs(CLIP_MS);
		finishingRef.current = false;
	}, []);
	const stopRecording = (0, import_react.useCallback)(() => {
		const rec = recorderRef.current;
		const canvas = canvasRef.current;
		const video = videoRef.current;
		const wrap = wrapRef.current;
		const palette = paletteRef.current;
		if (canvas && video && wrap && palette) gridRef.current = liveRef.current.draw({
			canvas,
			video,
			wrapW: wrap.clientWidth || 360,
			wrapH: wrap.clientHeight || 640,
			density: densityRef.current,
			palette,
			capture: true
		});
		if (!rec) {
			setRecording(false);
			return;
		}
		try {
			if (rec.state === "recording") rec.requestData();
		} catch {}
		try {
			if (rec.state !== "inactive") rec.stop();
		} catch {
			setRecording(false);
		}
		window.setTimeout(() => {
			if (!recordingRef.current) return;
			const mime = rec.mimeType || pickRecorderMime() || "video/webm";
			const blob = new Blob(chunksRef.current, { type: mime });
			if (blob.size > 0) finishClip(blob, mime);
			else setRecording(false);
		}, 400);
	}, [finishClip]);
	const startRecording = () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		const wrap = wrapRef.current;
		const palette = paletteRef.current;
		if (!canvas || recordingRef.current || draft) return;
		const mime = pickRecorderMime();
		if (!mime || typeof canvas.captureStream !== "function") {
			setError("This browser can’t record the mosaic. Try a still upload.");
			return;
		}
		if (video && wrap && palette) liveRef.current.draw({
			canvas,
			video,
			wrapW: wrap.clientWidth || 360,
			wrapH: wrap.clientHeight || 640,
			density: densityRef.current,
			palette,
			capture: false
		});
		let stream;
		try {
			stream = canvas.captureStream(Math.min(20, liveFpsFor(densityRef.current)));
		} catch {
			setError("This browser can’t record the mosaic. Try a still upload.");
			return;
		}
		let rec;
		const bits = isIosLive() || !isDesktopLive() ? 8e5 : 2e6;
		try {
			rec = new MediaRecorder(stream, {
				mimeType: mime,
				videoBitsPerSecond: bits
			});
		} catch {
			rec = new MediaRecorder(stream);
		}
		chunksRef.current = [];
		finishingRef.current = false;
		firstJpegRef.current = null;
		snapshotsRef.current = [];
		rec.ondataavailable = (event) => {
			if (event.data.size) chunksRef.current.push(event.data);
		};
		rec.onerror = () => {
			setError("Recording failed. Try a shorter clip or a still.");
			setRecording(false);
			recordingRef.current = false;
		};
		rec.onstop = () => {
			const type = rec.mimeType || mime;
			const blob = new Blob(chunksRef.current, { type });
			if (blob.size > 0) finishClip(blob, type);
			else {
				const empty = new Blob([new Uint8Array([0])], { type });
				finishClip(empty, type);
			}
		};
		recorderRef.current = rec;
		recordingRef.current = true;
		try {
			if (isIosLive()) rec.start();
			else rec.start(200);
		} catch {
			try {
				rec.start();
			} catch {
				setError("Could not start recording.");
				recordingRef.current = false;
				return;
			}
		}
		setRecording(true);
		setRemainMs(CLIP_MS);
		window.setTimeout(() => {
			const frame = canvasRef.current;
			if (!frame || !recordingRef.current) return;
			canvasToJpegBase64(frame, 1200, .88).then((jpeg) => {
				if (recordingRef.current) firstJpegRef.current = jpeg;
			});
		}, 180);
	};
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const shell = shellRef.current;
		const goFull = () => {
			const el = shell;
			if (!el) return;
			const req = el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
			if (req) Promise.resolve(req()).catch(() => void 0);
		};
		goFull();
		const applyView = () => {
			const vv = window.visualViewport;
			if (!shell) return;
			if (vv) {
				shell.style.top = `${vv.offsetTop}px`;
				shell.style.left = `${vv.offsetLeft}px`;
				shell.style.width = `${vv.width}px`;
				shell.style.height = `${vv.height}px`;
			} else {
				shell.style.top = "0";
				shell.style.left = "0";
				shell.style.width = "100%";
				shell.style.height = "100dvh";
			}
			setWake((n) => n + 1);
		};
		applyView();
		window.visualViewport?.addEventListener("resize", applyView);
		window.visualViewport?.addEventListener("scroll", applyView);
		window.addEventListener("orientationchange", applyView);
		window.addEventListener("resize", applyView);
		return () => {
			document.body.style.overflow = prev;
			window.visualViewport?.removeEventListener("resize", applyView);
			window.visualViewport?.removeEventListener("scroll", applyView);
			window.removeEventListener("orientationchange", applyView);
			window.removeEventListener("resize", applyView);
			const doc = document;
			try {
				if (document.fullscreenElement) document.exitFullscreen();
				else doc.webkitExitFullscreen?.();
			} catch {}
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!draft) return;
		const onKey = (event) => {
			if (event.key === "Escape") discardDraft();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [draft]);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const started = performance.now();
		const id = window.setInterval(() => {
			const left = Math.max(0, CLIP_MS - (performance.now() - started));
			setRemainMs(left);
			if (left <= 0) stopRecording();
		}, 100);
		const snap = window.setInterval(() => {
			const frame = canvasRef.current;
			if (!frame || !recordingRef.current) return;
			canvasToJpegBase64(frame, 960, .8).then((jpeg) => {
				if (recordingRef.current) snapshotsRef.current.push(jpeg);
			});
		}, 450);
		return () => {
			window.clearInterval(id);
			window.clearInterval(snap);
		};
	}, [recording, stopRecording]);
	const discardDraft = () => {
		setDraft(null);
		setTitle("");
		setSaving(false);
	};
	const closeAll = () => {
		if (recording) stopRecording();
		discardDraft();
		onClose();
	};
	const goFans = () => {
		closeAll();
		navigate({
			to: "/",
			search: { view: "fans" }
		});
	};
	const saveClip = async () => {
		if (!draft || saving) return;
		setSaving(true);
		setError(null);
		const emojiText = draft.grid.glyphs.length > 0 ? glyphsToText(draft.grid.glyphs, draft.grid.cols) : "🎞️";
		const payload = {
			title: title.trim() || void 0,
			cols: Math.min(256, Math.max(2, draft.grid.cols)),
			rows: Math.min(256, Math.max(2, draft.grid.rows)),
			emojiText,
			imageJpeg: dataUrlToJpeg(draft.jpeg)
		};
		const tryPublish = async (withVideo) => {
			let videoBase64;
			if (withVideo && draft.blob.size > 64 && draft.blob.size <= 24e5) {
				videoBase64 = await blobToBase64(draft.blob);
				if (videoBase64.length > 32e5) videoBase64 = void 0;
			}
			return publishFanWork({ data: {
				...payload,
				kind: videoBase64 ? "clip" : "still",
				videoBase64,
				videoMime: videoBase64 ? draft.mime : void 0
			} });
		};
		try {
			let result;
			try {
				result = await tryPublish(true);
			} catch {
				result = await tryPublish(false);
			}
			const savedTitle = title.trim() || "Emoji New Master";
			const ogJpeg = draft.ogJpeg;
			discardDraft();
			fetch(`/api/og-preview?p=/fan/${result.id}&v=3`).catch(() => void 0);
			notifyAddedToFans(savedTitle);
			onSaved({
				id: result.id,
				url: `${window.location.origin}/fan/${result.id}`,
				title: savedTitle,
				ipfs: result.pinata,
				ogJpeg
			});
			onClose();
			navigate({
				to: "/fan/$id",
				params: { id: result.id }
			});
		} catch {
			setError("Could not save that clip. Try again, or download it.");
			setSaving(false);
		}
	};
	if (!open) return null;
	const secs = Math.ceil(remainMs / 1e3);
	const at = Math.max(0, steps.findIndex((step) => step === density));
	const canCoarser = at > 0 && !recording && !draft;
	const canFiner = at < steps.length - 1 && !recording && !draft;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: "fixed inset-0 z-50 h-[100dvh] w-full bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: "hidden",
				playsInline: true,
				muted: true,
				autoPlay: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "absolute inset-0 overflow-hidden bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "absolute inset-0 size-full object-cover",
					"aria-label": "Live emoji mosaic from camera"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))] landscape:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
							emoji: "❌",
							label: "Close camera",
							onClick: closeAll
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))] landscape:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
							emoji: "🔄",
							label: "Switch camera",
							onClick: () => void flipCamera(),
							disabled: recording
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg tabular-nums",
							children: recording ? `🔴 0:${String(secs).padStart(2, "0")}` : grid?.cols && grid.rows ? `${grid.cols} × ${grid.rows}` : "12s reel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: goFans,
							className: "pointer-events-auto rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg",
							children: "🖼️ Fans"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute top-[max(0.4rem,env(safe-area-inset-top))] bottom-[max(0.4rem,env(safe-area-inset-bottom))] left-[max(0.4rem,env(safe-area-inset-left))] hidden flex-col items-center justify-between landscape:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
							emoji: "❌",
							label: "Close camera",
							onClick: closeAll
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
								emoji: "➖",
								label: "Fewer emoji",
								onClick: () => setDensity(steps[Math.max(0, at - 1)]),
								disabled: !canCoarser
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
								emoji: "➕",
								label: "More emoji",
								onClick: () => setDensity(steps[Math.min(steps.length - 1, at + 1)]),
								disabled: !canFiner
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute top-[max(0.4rem,env(safe-area-inset-top))] bottom-[max(0.4rem,env(safe-area-inset-bottom))] right-[max(0.4rem,env(safe-area-inset-right))] hidden flex-col items-center justify-between landscape:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
							emoji: "🔄",
							label: "Switch camera",
							onClick: () => void flipCamera(),
							disabled: recording
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
							emoji: recording ? "⏹️" : "🔴",
							label: recording ? "Stop recording" : "Record",
							onClick: () => recording ? stopRecording() : startRecording(),
							hot: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute inset-x-0 bottom-0 bg-bg/80 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] landscape:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-lg items-end justify-between gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
									emoji: "➖",
									label: "Fewer emoji",
									onClick: () => setDensity(steps[Math.max(0, at - 1)]),
									disabled: !canCoarser
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-1 flex-col items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
										emoji: recording ? "⏹️" : "🔴",
										label: recording ? "Stop recording" : "Record",
										onClick: () => recording ? stopRecording() : startRecording(),
										hot: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs font-semibold text-fg",
										children: recording ? "tap ⏹️ anytime to stop" : "tap 🔴 · stop whenever · max 12s"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamEmojiBtn, {
									emoji: "➕",
									label: "More emoji",
									onClick: () => setDensity(steps[Math.min(steps.length - 1, at + 1)]),
									disabled: !canFiner
								})
							]
						}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-sm font-medium text-headline",
							children: error
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 hidden -translate-x-1/2 rounded-full bg-bg/80 px-3 py-1 text-sm font-medium text-headline landscape:block",
						children: error
					})
				]
			}),
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 flex items-end justify-center bg-bg/80 p-4 sm:items-center",
				onClick: discardDraft,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-labelledby": "clip-title-label",
					className: "max-h-[90dvh] w-full max-w-md overflow-auto rounded-xl border border-border bg-surface p-5 landscape:max-h-[86dvh]",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "clip-title-label",
							className: "font-sans text-xl font-bold text-headline",
							children: "Title this clip"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Save it to Fans, or download. Tap outside to throw it away."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OgSharePreview, {
							readySrc: draft.ogJpeg,
							jpeg: draft.jpeg,
							className: "mt-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							maxLength: 80,
							placeholder: "Emoji New Master",
							className: "mt-4",
							autoFocus: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-medium text-fg",
									children: "Download"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicExport, {
									name: title.trim() || "emoji-clip",
									grid: draft.grid,
									jpegUrl: `data:image/jpeg;base64,${draft.jpeg}`,
									cover: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "mt-2 w-full",
									onClick: () => downloadBlob(draft.blob, `${fileStem(title.trim() || "emoji-clip")}.${videoExt(draft.mime)}`),
									children: "Download video"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "buy",
							className: "mt-4 w-full",
							onClick: () => void saveClip(),
							disabled: saving,
							children: saving ? "Saving…" : "Save to Fans"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-sm font-medium text-headline",
							children: error
						})
					]
				})
			}) : null
		]
	});
}
function CamEmojiBtn({ emoji, label, onClick, disabled = false, hot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		disabled,
		onClick,
		className: hot ? "flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-fg bg-headline text-4xl shadow-lg disabled:opacity-40 sm:size-24 sm:text-5xl landscape:size-16 landscape:border-2 landscape:text-3xl" : "flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-fg bg-bg text-2xl shadow-lg disabled:opacity-40 sm:size-16 sm:text-3xl landscape:size-12 landscape:text-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: emoji
		})
	});
}
function SvgCameraStudio({ open, onClose, onSaved }) {
	const navigate = useNavigate();
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const liveRef = (0, import_react.useRef)(createLiveRenderer());
	const paletteRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const framesRef = (0, import_react.useRef)([]);
	const gridRef = (0, import_react.useRef)(null);
	const facingRef = (0, import_react.useRef)("environment");
	const densityRef = (0, import_react.useRef)(48);
	const recordingRef = (0, import_react.useRef)(false);
	const lastCaptureRef = (0, import_react.useRef)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [density, setDensity] = (0, import_react.useState)(48);
	const [facing, setFacing] = (0, import_react.useState)("environment");
	const [grid, setGrid] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [remainMs, setRemainMs] = (0, import_react.useState)(SVG_CLIP_MS);
	const [wake, setWake] = (0, import_react.useState)(0);
	const [title, setTitle] = (0, import_react.useState)("");
	const [reel, setReel] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [encoding, setEncoding] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(null);
	densityRef.current = density;
	facingRef.current = facing;
	recordingRef.current = recording;
	const stopStream = (0, import_react.useCallback)(() => {
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
	}, []);
	const startStream = (0, import_react.useCallback)(async (mode) => {
		stopStream();
		const desktop = isDesktopLive();
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: desktop ? {
				facingMode: { ideal: mode },
				width: {
					ideal: 640,
					max: 960
				},
				height: {
					ideal: 360,
					max: 540
				},
				frameRate: {
					ideal: 24,
					max: 30
				}
			} : {
				facingMode: { ideal: mode },
				frameRate: {
					ideal: 24,
					max: 30
				}
			}
		});
		streamRef.current = stream;
		const video = videoRef.current;
		if (video) {
			video.srcObject = stream;
			video.muted = true;
			video.playsInline = true;
			await video.play();
		}
	}, [stopStream]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		setError(null);
		setReel(null);
		setTitle("");
		setRecording(false);
		setSaved(null);
		setRemainMs(SVG_CLIP_MS);
		(async () => {
			try {
				await startStream(facingRef.current);
			} catch {
				if (alive) setError("Camera permission is needed for an SVG reel.");
			}
		})();
		return () => {
			alive = false;
			stopStream();
		};
	}, [
		open,
		startStream,
		stopStream
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		ensurePalette().then((palette) => {
			if (alive) paletteRef.current = palette;
		});
		return () => {
			alive = false;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const shell = shellRef.current;
		const goFull = () => requestFullscreenEl(shell ?? document.documentElement);
		goFull();
		const onInteract = () => {
			if (!document.fullscreenElement) goFull();
		};
		shell?.addEventListener("pointerdown", onInteract);
		const applyView = () => {
			if (!shell) return;
			shell.style.top = "0";
			shell.style.left = "0";
			shell.style.width = "100%";
			shell.style.height = "100dvh";
			setWake((n) => n + 1);
		};
		applyView();
		window.addEventListener("orientationchange", applyView);
		window.addEventListener("resize", applyView);
		return () => {
			document.body.style.overflow = prev;
			shell?.removeEventListener("pointerdown", onInteract);
			window.removeEventListener("orientationchange", applyView);
			window.removeEventListener("resize", applyView);
			exitFullscreenSafe();
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas) return;
		const zoom = {
			scale: 1,
			x: 0,
			y: 0
		};
		let gesture = null;
		const paint = () => {
			canvas.style.transformOrigin = "center center";
			canvas.style.transform = `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`;
		};
		paint();
		const clamp = () => {
			zoom.scale = Math.min(6, Math.max(1, zoom.scale));
			if (zoom.scale <= 1.02) {
				zoom.scale = 1;
				zoom.x = 0;
				zoom.y = 0;
			}
		};
		const pair = (touches) => {
			const a = touches.item(0);
			const b = touches.item(1);
			if (!a || !b) return null;
			const dx = a.clientX - b.clientX;
			const dy = a.clientY - b.clientY;
			return {
				dist: Math.hypot(dx, dy) || 1,
				cx: (a.clientX + b.clientX) / 2,
				cy: (a.clientY + b.clientY) / 2
			};
		};
		const onStart = (event) => {
			if (event.touches.length >= 2) {
				const p = pair(event.touches);
				if (!p) return;
				event.preventDefault();
				gesture = {
					dist: p.dist,
					scale: zoom.scale,
					x: zoom.x,
					y: zoom.y,
					cx: p.cx,
					cy: p.cy,
					px: 0,
					py: 0,
					fingers: 2
				};
				return;
			}
			if (event.touches.length === 1 && zoom.scale > 1.02) {
				const t = event.touches.item(0);
				if (!t) return;
				gesture = {
					dist: 1,
					scale: zoom.scale,
					x: zoom.x,
					y: zoom.y,
					cx: t.clientX,
					cy: t.clientY,
					px: t.clientX,
					py: t.clientY,
					fingers: 1
				};
			}
		};
		const onMove = (event) => {
			if (!gesture) return;
			if (event.touches.length >= 2 && gesture.fingers >= 2) {
				const p = pair(event.touches);
				if (!p) return;
				event.preventDefault();
				const next = Math.min(6, Math.max(1, gesture.scale * (p.dist / gesture.dist)));
				const ratio = next / gesture.scale;
				const box = wrap.getBoundingClientRect();
				const ox = box.left + box.width / 2;
				const oy = box.top + box.height / 2;
				zoom.scale = next;
				zoom.x = gesture.x * ratio + (p.cx - ox) * (1 - ratio) + (p.cx - gesture.cx);
				zoom.y = gesture.y * ratio + (p.cy - oy) * (1 - ratio) + (p.cy - gesture.cy);
				clamp();
				paint();
				return;
			}
			if (event.touches.length === 1 && gesture.fingers === 1) {
				const t = event.touches.item(0);
				if (!t) return;
				event.preventDefault();
				zoom.x = gesture.x + (t.clientX - gesture.px);
				zoom.y = gesture.y + (t.clientY - gesture.py);
				paint();
			}
		};
		const onEnd = (event) => {
			if (event.touches.length >= 2) {
				const p = pair(event.touches);
				if (p) {
					gesture = {
						dist: p.dist,
						scale: zoom.scale,
						x: zoom.x,
						y: zoom.y,
						cx: p.cx,
						cy: p.cy,
						px: 0,
						py: 0,
						fingers: 2
					};
					return;
				}
			}
			if (event.touches.length === 1 && zoom.scale > 1.02) {
				const t = event.touches.item(0);
				if (t) {
					gesture = {
						dist: 1,
						scale: zoom.scale,
						x: zoom.x,
						y: zoom.y,
						cx: t.clientX,
						cy: t.clientY,
						px: t.clientX,
						py: t.clientY,
						fingers: 1
					};
					return;
				}
			}
			gesture = null;
			clamp();
			paint();
		};
		wrap.addEventListener("touchstart", onStart, { passive: false });
		wrap.addEventListener("touchmove", onMove, { passive: false });
		wrap.addEventListener("touchend", onEnd);
		wrap.addEventListener("touchcancel", onEnd);
		return () => {
			wrap.removeEventListener("touchstart", onStart);
			wrap.removeEventListener("touchmove", onMove);
			wrap.removeEventListener("touchend", onEnd);
			wrap.removeEventListener("touchcancel", onEnd);
			canvas.style.transform = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let alive = true;
		let raf = 0;
		let last = 0;
		const loop = (stamp) => {
			if (!alive) return;
			raf = requestAnimationFrame(loop);
			if (stamp - last < 1e3 / liveFpsFor(densityRef.current)) return;
			const video = videoRef.current;
			const canvas = canvasRef.current;
			const wrap = wrapRef.current;
			const palette = paletteRef.current;
			if (!video || !canvas || !wrap || !palette || video.readyState < 2) return;
			if (!video.videoWidth) return;
			last = stamp;
			const capture = recordingRef.current && stamp - lastCaptureRef.current >= 125;
			const info = liveRef.current.draw({
				canvas,
				video,
				wrapW: wrap.clientWidth || 360,
				wrapH: wrap.clientHeight || 640,
				density: densityRef.current,
				palette,
				capture
			});
			gridRef.current = info;
			setGrid((prev) => prev && prev.cols === info.cols && prev.rows === info.rows ? prev : info);
			if (capture && info.glyphs.length) {
				lastCaptureRef.current = stamp;
				framesRef.current.push({
					cols: info.cols,
					rows: info.rows,
					glyphs: info.glyphs.slice(),
					colors: new Uint8ClampedArray(info.colors)
				});
			}
		};
		raf = requestAnimationFrame(loop);
		return () => {
			alive = false;
			cancelAnimationFrame(raf);
		};
	}, [open, wake]);
	const finishReel = (0, import_react.useCallback)(() => {
		recordingRef.current = false;
		setRecording(false);
		setRemainMs(SVG_CLIP_MS);
		const frames = framesRef.current;
		if (frames.length < 2) {
			setError("Need a little more motion. Hold record a beat longer.");
			return;
		}
		try {
			const svg = framesToAnimatedSvg(frames, 8, 44);
			setReel(svg);
		} catch {
			setError("Could not pack that SVG. Try fewer emoji.");
		}
	}, []);
	const stopRecording = (0, import_react.useCallback)(() => {
		if (!recordingRef.current) return;
		finishReel();
	}, [finishReel]);
	const startRecording = () => {
		if (recordingRef.current || reel) return;
		framesRef.current = [];
		lastCaptureRef.current = 0;
		recordingRef.current = true;
		setRecording(true);
		setSaved(null);
		setRemainMs(SVG_CLIP_MS);
		setError(null);
	};
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const started = performance.now();
		const id = window.setInterval(() => {
			const left = Math.max(0, SVG_CLIP_MS - (performance.now() - started));
			setRemainMs(left);
			if (left <= 0) stopRecording();
		}, 100);
		return () => window.clearInterval(id);
	}, [recording, stopRecording]);
	const flipCamera = async () => {
		if (recording) return;
		const next = facing === "user" ? "environment" : "user";
		setFacing(next);
		try {
			await startStream(next);
		} catch {
			setError("Could not switch cameras.");
		}
	};
	const discard = () => {
		if (saving || encoding) return;
		setReel(null);
		setTitle("");
		setSaved(null);
		framesRef.current = [];
	};
	const closeAll = () => {
		if (recording) stopRecording();
		discard();
		onClose();
	};
	const saveReel = async () => {
		if (!reel || saving || saved) return;
		const frames = framesRef.current;
		const first = frames[0];
		if (!first) return;
		setSaving(true);
		setError(null);
		try {
			const mid = frames[Math.floor(frames.length / 2)] ?? first;
			const poster = document.createElement("canvas");
			letterboxReelFrame(poster, mid, 960, 960);
			const imageJpeg = await canvasToJpegBase64(poster, 960, .86);
			const framesJson = packReelFrames(frames, 8);
			const base = {
				title: title.trim() || void 0,
				cols: first.cols,
				rows: first.rows,
				fps: 8,
				frameCount: frames.length,
				emojiText: glyphsToText(mid.glyphs, mid.cols) || "🎞️",
				imageJpeg,
				svg: reel
			};
			let result;
			try {
				result = await publishSvgReel({ data: {
					...base,
					framesJson
				} });
			} catch {
				result = await publishSvgReel({ data: base });
			}
			const next = {
				id: result.id,
				title: result.title,
				ipfs: result.ipfs
			};
			setSaved(next);
			onSaved?.(next);
			notifyAddedSvgReel(next.title);
			onClose();
			navigate({
				to: "/svg/$id",
				params: { id: next.id }
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "";
			setError(msg && msg.length < 160 ? `Could not save that SVG reel. ${msg}` : "Could not save that SVG reel. You can still download it.");
		} finally {
			setSaving(false);
		}
	};
	const onVideo = async (size) => {
		if (encoding) return;
		const frames = framesRef.current;
		if (frames.length < 2) return;
		setEncoding(size);
		setError(null);
		try {
			await downloadReelVideo(frames, title.trim() || saved?.title || "emoji-svg-reel", 8, size);
		} catch {
			setError(`Could not encode ${size.toUpperCase()} in this browser.`);
		} finally {
			setEncoding(null);
		}
	};
	const at = Math.max(0, SVG_DENSITY_STEPS.findIndex((step) => step === density));
	const canCoarser = at > 0 && !recording && !reel;
	const canFiner = at < SVG_DENSITY_STEPS.length - 1 && !recording && !reel;
	const secs = Math.ceil(remainMs / 1e3);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: "fixed inset-0 z-50 h-[100dvh] w-full bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: "hidden",
				playsInline: true,
				muted: true,
				autoPlay: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "absolute inset-0 overflow-hidden bg-bg touch-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "absolute inset-0 size-full object-cover will-change-transform",
					"aria-label": "Live emoji mosaic for SVG reel"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] left-[max(0.5rem,env(safe-area-inset-left))]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamBtn, {
							emoji: "❌",
							label: "Close",
							onClick: closeAll
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-auto absolute top-[max(0.5rem,env(safe-area-inset-top))] right-[max(0.5rem,env(safe-area-inset-right))]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamBtn, {
							emoji: "🔄",
							label: "Switch camera",
							onClick: () => void flipCamera(),
							disabled: recording
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-full bg-bg/80 px-3 py-1 text-xs font-bold text-fg tabular-nums",
							children: recording ? `✏️ 0:${String(secs).padStart(2, "0")} SVG` : grid?.cols && grid.rows ? `${grid.cols} × ${grid.rows} · pinch to zoom` : "24s SVG reel · pinch to zoom"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-auto absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamBtn, {
								emoji: "➖",
								label: "Fewer emoji",
								disabled: !canCoarser,
								onClick: () => setDensity(SVG_DENSITY_STEPS[Math.max(0, at - 1)])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamBtn, {
								emoji: recording ? "⏹️" : "🟠",
								label: recording ? "Stop SVG reel" : "Record SVG reel",
								hot: true,
								onClick: () => recording ? stopRecording() : startRecording(),
								disabled: Boolean(reel)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamBtn, {
								emoji: "➕",
								label: "More emoji",
								disabled: !canFiner,
								onClick: () => setDensity(SVG_DENSITY_STEPS[Math.min(SVG_DENSITY_STEPS.length - 1, at + 1)])
							})
						]
					}),
					error && !reel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute bottom-[max(6rem,env(safe-area-inset-bottom))] left-1/2 w-[min(24rem,90%)] -translate-x-1/2 text-center text-sm font-medium text-headline",
						children: error
					}) : null
				]
			}),
			reel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 flex items-end justify-center bg-bg/85 p-4 sm:items-center",
				onClick: () => {
					if (saved) closeAll();
					else discard();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					className: "max-h-[90dvh] w-full max-w-md overflow-auto rounded-xl border border-border bg-surface p-5",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-sans text-xl font-bold text-headline",
							children: saved ? "Saved SVG reel" : "SVG reel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: saved ? "Share the link, grab the SVG, or export 4K." : "Title it, save it here (not Fans), or download. Tap outside to throw it away."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-4 overflow-hidden rounded-lg bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgReelPlayer, {
								title: title.trim() || "SVG reel",
								frames: framesRef.current,
								fps: 8,
								autoPlay: true
							}), encoding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoEncodeWait, {
								size: encoding,
								compact: true
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							maxLength: 80,
							placeholder: "Untitled SVG reel",
							className: "mt-4",
							autoFocus: !saved,
							disabled: Boolean(saved)
						}),
						!saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "buy",
							className: "mt-4 w-full",
							disabled: saving,
							onClick: () => void saveReel(),
							children: saving ? "Saving…" : "Save and Share"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
								path: `/svg/${saved.id}`,
								title: saved.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIpfsLinks, { pins: saved.ipfs })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-2 w-full",
							onClick: () => downloadSvg(reel, `${fileStem(title.trim() || saved?.title || "emoji-svg-reel")}.svg`, framesRef.current, 8),
							children: "Download SVG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-2 w-full",
							disabled: Boolean(encoding),
							onClick: () => void onVideo("4k"),
							children: encoding === "4k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, {}), " Building 4K…"]
							}) : "Download 4K video"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-2 w-full",
							disabled: Boolean(encoding),
							onClick: () => void onVideo("8k"),
							children: encoding === "8k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, {}), " Building 8K…"]
							}) : "Download 8K video"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							className: "mt-2 w-full",
							onClick: () => void navigator.clipboard.writeText(reel).catch(() => void 0),
							children: "Copy SVG markup"
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-sm font-medium text-headline",
							children: error
						}) : null
					]
				})
			}) : null
		]
	});
}
function CamBtn({ emoji, label, onClick, disabled = false, hot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		disabled,
		onClick,
		className: hot ? "flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-fg bg-headline text-4xl shadow-lg disabled:opacity-40" : "flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-fg bg-bg text-2xl shadow-lg disabled:opacity-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: emoji
		})
	});
}
var MAX_BYTES = 5242880;
var ALLOWED = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp"
]);
function TryOwn() {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [image, setImage] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [density, setDensity] = (0, import_react.useState)(64);
	const [grid, setGrid] = (0, import_react.useState)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [sharing, setSharing] = (0, import_react.useState)(false);
	const [rebuilding, setRebuilding] = (0, import_react.useState)(false);
	const [cameraOpen, setCameraOpen] = (0, import_react.useState)(false);
	const [svgOpen, setSvgOpen] = (0, import_react.useState)(false);
	const [share, setShare] = (0, import_react.useState)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const locked = Boolean(share);
	const onRendered = (0, import_react.useCallback)((info, canvas) => {
		setGrid(info);
		canvasRef.current = canvas;
		setRebuilding(false);
	}, []);
	const takeFile = async (file) => {
		setError(null);
		setShare(null);
		if (!file) return;
		if (!ALLOWED.has(file.type)) {
			setError("Use a JPEG, PNG, or WebP.");
			return;
		}
		if (file.size > MAX_BYTES) {
			setError("Keep the file under 5 MB.");
			return;
		}
		try {
			const img = await loadFromFile(file);
			setImage(img);
			setGrid(null);
			setRebuilding(true);
			setDensity(64);
		} catch {
			setError("Could not read that image.");
		}
	};
	const changeDensity = (next) => {
		if (locked) return;
		setRebuilding(true);
		setGrid(null);
		setDensity(next);
	};
	const onSaveShare = async () => {
		if (!image || !grid?.glyphs.length || locked) return;
		setError(null);
		setSharing(true);
		try {
			const palette = await ensurePalette();
			const hi = document.createElement("canvas");
			renderMosaic(hi, image, density, palette, 2400);
			let jpeg = await canvasToJpegBase64(hi, 2400, .92);
			if (jpeg.length > 4e6) jpeg = await canvasToJpegBase64(hi, 1800, .88);
			if (jpeg.length > 4e6) jpeg = await canvasToJpegBase64(hi, 1400, .84);
			const result = await publishFanWork({ data: {
				title: title.trim() || void 0,
				cols: grid.cols,
				rows: grid.rows,
				emojiText: glyphsToText(grid.glyphs, grid.cols),
				imageJpeg: jpeg
			} });
			notifyAddedToFans(title.trim() || void 0);
			await navigate({
				to: "/fan/$id",
				params: { id: result.id }
			});
		} catch {
			setError("Could not save that mosaic. Try again.");
		} finally {
			setSharing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl",
						children: "Camera"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-relaxed text-muted",
						children: "Open a live emoji mosaic of your camera, or drop a still. Record a 12-second reel, title it, and it lands in Gallery (Fans). SVG reels live there too, tagged experimental."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { view: "fans" },
						className: "mt-5 inline-flex h-11 items-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-fg transition-[background-color,border-color] duration-150 hover:border-headline hover:bg-surface-2",
						children: "Gallery (Fans)"
					})
				]
			}),
			!image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setError(null);
							setCameraOpen(true);
							requestFullscreenEl(document.documentElement);
						},
						className: "flex min-h-44 flex-col items-center justify-center rounded-xl border border-border bg-surface px-6 py-10 text-center transition-[background-color,border-color] duration-150 ease-out hover:border-headline hover:bg-surface-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl",
								"aria-hidden": "true",
								children: "📷"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 text-sm font-medium text-fg",
								children: "Open camera"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-sm text-subtle",
								children: "Live mosaic · front or rear · 12s reel"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						onDragOver: (e) => {
							e.preventDefault();
							setDrag(true);
						},
						onDragLeave: () => setDrag(false),
						onDrop: (e) => {
							e.preventDefault();
							setDrag(false);
							takeFile(e.dataTransfer.files[0]);
						},
						className: `flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-[background-color,border-color] duration-150 ease-out ${drag ? "border-headline bg-surface-2" : "border-border bg-surface"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 text-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 text-sm font-medium text-fg",
								children: "Drop an image or browse"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-sm text-subtle",
								children: "JPEG, PNG, WebP · 5 MB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								className: "sr-only",
								onChange: (e) => {
									takeFile(e.target.files?.[0]);
									e.target.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setError(null);
							setSvgOpen(true);
							requestFullscreenEl(document.documentElement);
						},
						className: "flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-8 text-center transition-[background-color,border-color] duration-150 ease-out hover:border-headline hover:bg-surface-2 sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted uppercase",
								children: "Experimental"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-2xl",
								"aria-hidden": "true",
								children: "📄"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-sm font-medium text-fg",
								children: "SVG reel camera"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-sm text-subtle",
								children: "Looping SVG movie · denser mosaic · lands in Fans"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface p-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicCanvas, {
							source: image,
							density,
							eager: true,
							label: "Your image as an emoji mosaic",
							onRendered
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 inline-flex h-11 cursor-pointer items-center text-sm text-muted transition-[color] duration-150 hover:text-fg",
					children: ["Replace image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						className: "sr-only",
						onChange: (e) => {
							takeFile(e.target.files?.[0]);
							e.target.value = "";
						}
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-surface p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium text-fg",
								htmlFor: "fan-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fan-title",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								maxLength: 80,
								placeholder: "Emoji New Master",
								className: "mt-2",
								disabled: locked
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-sm font-medium text-fg",
								children: "Glyphs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DensityControl, {
								value: density,
								onChange: changeDensity,
								cols: grid?.cols,
								rows: grid?.rows,
								locked,
								busy: rebuilding
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "buy",
								className: "w-full",
								onClick: () => void onSaveShare(),
								disabled: sharing || locked || rebuilding || !grid?.glyphs.length,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), locked ? "Saved" : sharing ? "Saving…" : "Save and Share"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-sm font-medium text-fg",
								children: "Download"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicExport, {
								name: title.trim() || "emoji-new-master",
								grid,
								canvas: canvasRef.current
							})] })
						]
					}), share && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-border pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-fg",
								children: "Saved — send to a friend"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Glyph count is locked. The JPEG and emoji text are in the archive."
							}),
							share.ogJpeg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OgSharePreview, { readySrc: share.ogJpeg })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								readOnly: true,
								value: share.url,
								className: "mt-3 font-mono text-xs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
									path: `/fan/${share.id}`,
									title: title.trim() || "Emoji New Master"
								})
							}),
							share.ipfs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpfsCopy, { pins: share.ipfs })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								className: "mt-3 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/fan/$id",
									params: { id: share.id },
									children: "Open artwork"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "mt-2 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									search: { view: "fans" },
									children: "Gallery (Fans)"
								})
							})
						]
					})]
				})]
			}),
			share && !image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-border bg-surface p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-fg",
						children: "Saved — send to a friend"
					}),
					share.ogJpeg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OgSharePreview, { readySrc: share.ogJpeg })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						readOnly: true,
						value: share.url,
						className: "mt-3 font-mono text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
							path: `/fan/${share.id}`,
							title: "Emoji New Master"
						})
					}),
					share.ipfs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpfsCopy, { pins: share.ipfs })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/fan/$id",
							params: { id: share.id },
							children: "Open artwork"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-2 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							search: { view: "fans" },
							children: "Gallery (Fans)"
						})
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraStudio, {
				open: cameraOpen,
				onClose: () => setCameraOpen(false),
				onSaved: (saved) => {
					notifyAddedToFans(saved.title);
					setShare({
						id: saved.id,
						url: saved.url,
						ipfs: saved.ipfs,
						ogJpeg: saved.ogJpeg
					});
					setTitle(saved.title);
					navigate({
						to: "/fan/$id",
						params: { id: saved.id }
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCameraStudio, {
				open: svgOpen,
				onClose: () => setSvgOpen(false)
			})
		]
	});
}
//#endregion
export { TryOwn as component };

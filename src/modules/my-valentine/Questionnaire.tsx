"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import css from "@css/pages/questionnaire.module.scss";
import { QuestionnaireInput } from "@/modules/my-valentine/Input";
import { Controller } from "react-hook-form";
import { DateSelector } from "@/modules/my-valentine/DateSelector";

export type QuestionnaireFormValues = {
	woman: string;
	man: string;
	date: string; // YYYY-MM-DD
	track: string;
	photo: string;
};

export function Questionnaire() {
	const router = useRouter();

	const { register, watch, handleSubmit, control } = useForm<QuestionnaireFormValues>({
		defaultValues: {
			woman: "",
			man: "",
			date: "",
			track: "",
			photo: ""
		}
	});

	const values = watch();

	const shareUrl = useMemo(() => {
		const params = new URLSearchParams();

		const w = values.woman?.trim();
		const m = values.man?.trim();
		const t = values.track?.trim();
		const p = values.photo?.trim();
		const ms = values.date ? new Date(values.date).getTime() : NaN;

		if (w) params.set("woman", w);
		if (m) params.set("man", m);
		if (Number.isFinite(ms)) params.set("since", String(ms));
		if (t) params.set("track", t);
		if (p) params.set("photo", p);

		const qs = params.toString();
		return qs ? `/my-valentine?${qs}` : "/my-valentine";
	}, [values]);

	const onCopy = async () => {
		const full = `${window.location.origin}${shareUrl}`;
		await navigator.clipboard.writeText(full);
	};

	const onOpen = () => router.push(shareUrl);

	const onSubmit = handleSubmit(() => {
		onOpen();
	});

	return (
		<form className={css.questionnaire} onSubmit={onSubmit}>
			<div className={css.title}>Create your Valentine letter</div>

			<div className={css.form}>
				<QuestionnaireInput
					register={register}
					id="woman"
					placeholder="Woman name"
					description="Enter your woman name"
					required
				/>
				<QuestionnaireInput
					register={register}
					id="man"
					placeholder="Man name"
					description="Enter your name"
					required
				/>
				<Controller
					control={control}
					name="date"
					rules={{ required: true }}
					render={({ field }) => (
						<DateSelector value={field.value} onChange={field.onChange} required />
					)}
				/>
				<QuestionnaireInput
					register={register}
					id="track"
					placeholder="Insert your song name"
					description=""
					required
				/>
				<QuestionnaireInput
					register={register}
					id="photo"
					placeholder="Your photo url"
					description=""
					required
				/>

				<div>{typeof window !== "undefined" ? `${window.location.origin}${shareUrl}` : shareUrl}</div>

				<div>
					<button type="button" onClick={onCopy}>
						Copy URL
					</button>
					<button type="submit">Open</button>
				</div>
			</div>
		</form>
	);
}

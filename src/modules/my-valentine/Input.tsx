import css from "@css/pages/questionnaire.module.scss";
import { UseFormRegister } from "react-hook-form";
import { QuestionnaireFormValues } from "@/modules/my-valentine/Questionnaire";
import cn from "classnames";
import { ChangeEventHandler, FocusEventHandler, useState } from "react";

type QuestionnaireInputProps = {
	register: UseFormRegister<QuestionnaireFormValues>;
	id: keyof QuestionnaireFormValues;
	placeholder: string;
	description: string;
	type?: string;
	defaultValue?: string;
	required: boolean;
};

export function QuestionnaireInput({
	register,
	id,
	placeholder,
	description,
	required,
	defaultValue,
	type = "text"
}: QuestionnaireInputProps) {
	const [focused, setFocused] = useState(false);
	const [hasValue, setHasValue] = useState(!!defaultValue || false);

	const onFocus: FocusEventHandler<HTMLInputElement> = () => {
		setFocused(true);
	};
	const onBlur: FocusEventHandler<HTMLInputElement> = () => {
		setFocused(false);
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		let value = e.target.value;
		setHasValue(!!value);
	};

	return (
		<div className={cn(css.inputWrapper, { [css.focused]: focused, [css.hasValue]: hasValue })}>
			<span className={css.placeholder}>{placeholder}</span>
			<input
				{...register(id)}
				required={required}
				type={type}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
				className={cn(css.input, type === "date" && css.dateInput)}
			/>

			<div className={css.description}>{description}</div>
		</div>
	);
}

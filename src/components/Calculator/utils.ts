type Token =
	| { type: "number"; value: number }
	| { type: "op"; value: "+" | "-" | "*" | "/" }
	| { type: "lparen" }
	| { type: "rparen" };

export function isDigit(ch: string) {
	return ch >= "0" && ch <= "9";
}

export function tokenize(expr: string): Token[] {
	const s = expr.replace(/\s+/g, "");
	const tokens: Token[] = [];

	let i = 0;
	while (i < s.length) {
		const ch = s[i];

		if (isDigit(ch) || ch === ".") {
			let j = i;
			let dotCount = 0;
			while (j < s.length && (isDigit(s[j]) || s[j] === ".")) {
				if (s[j] === ".") dotCount++;
				j++;
			}
			if (dotCount > 1) throw new Error("Invalid number format");
			const raw = s.slice(i, j);
			if (raw === "." || raw === "+." || raw === "-.") throw new Error("Invalid number format");
			const num = Number(raw);
			if (!Number.isFinite(num)) throw new Error("Invalid number");
			tokens.push({ type: "number", value: num });
			i = j;
			continue;
		}

		if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
			tokens.push({ type: "op", value: ch });
			i++;
			continue;
		}

		if (ch === "(") {
			tokens.push({ type: "lparen" });
			i++;
			continue;
		}
		if (ch === ")") {
			tokens.push({ type: "rparen" });
			i++;
			continue;
		}

		throw new Error(`Unexpected character: ${ch}`);
	}

	return tokens;
}

export function precedence(op: Token & { type: "op" }) {
	return op.value === "*" || op.value === "/" ? 2 : 1;
}

export function toRpn(tokens: Token[]): Token[] {
	const output: Token[] = [];
	const stack: Token[] = [];

	let prev: Token | null = null;

	for (const t of tokens) {
		if (t.type === "number") {
			output.push(t);
			prev = t;
			continue;
		}

		if (t.type === "lparen") {
			stack.push(t);
			prev = t;
			continue;
		}

		if (t.type === "rparen") {
			while (stack.length && stack[stack.length - 1].type !== "lparen") {
				output.push(stack.pop()!);
			}
			if (!stack.length) throw new Error("Mismatched parentheses");
			stack.pop(); // pop lparen
			prev = t;
			continue;
		}

		if (t.type === "op") {
			const isUnaryMinus =
				t.value === "-" && (prev === null || prev.type === "op" || prev.type === "lparen");

			if (isUnaryMinus) {
				// represent unary minus as: 0 <expr> -
				output.push({ type: "number", value: 0 });
			}

			while (stack.length) {
				const top = stack[stack.length - 1];
				if (top.type !== "op") break;

				const pTop = precedence(top);
				const pCur = precedence(t);

				if (pTop >= pCur) output.push(stack.pop()!);
				else break;
			}

			stack.push(t);
			prev = t;
			continue;
		}
	}

	while (stack.length) {
		const t = stack.pop()!;
		if (t.type === "lparen" || t.type === "rparen") throw new Error("Mismatched parentheses");
		output.push(t);
	}

	return output;
}

export function evalRpn(tokens: Token[]): number {
	const st: number[] = [];
	for (const t of tokens) {
		if (t.type === "number") {
			st.push(t.value);
			continue;
		}
		if (t.type === "op") {
			const b = st.pop();
			const a = st.pop();
			if (a === undefined || b === undefined) throw new Error("Invalid expression");

			let r: number;
			switch (t.value) {
				case "+":
					r = a + b;
					break;
				case "-":
					r = a - b;
					break;
				case "*":
					r = a * b;
					break;
				case "/":
					if (b === 0) throw new Error("Division by zero");
					r = a / b;
					break;
			}
			st.push(r);
		}
	}
	if (st.length !== 1) throw new Error("Invalid expression");
	return st[0];
}

export function evaluate(expr: string): number {
	const tokens = tokenize(expr);
	const rpn = toRpn(tokens);
	return evalRpn(rpn);
}

export function formatNumber(n: number) {
	const s = String(n);
	if (s.includes("e") || s.includes("E")) return s;
	const fixed = n.toFixed(12);
	return fixed.replace(/\.?0+$/, "");
}

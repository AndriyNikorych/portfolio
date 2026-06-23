export async function getLangParams<R extends object>(params: Promise<{ lang: string } & R>) {
	const p = await params;
	const isRoot = p.lang.startsWith("root_");
	let locale = p.lang.replace("root_", "");
	if (locale.length !== 5) {
		locale = "en-US";
	}
	return {
		locale,
		isRoot,
		p
	};
}

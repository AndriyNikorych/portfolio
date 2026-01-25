export async function getLangParams<R extends object>(params: Promise<{ locale: string } & R>) {
	const p = await params;
	const isRoot = p.locale.startsWith("root_");
	let locale = p.locale.replace("root_", "");
	return {
		locale,
		isRoot,
		p
	};
}

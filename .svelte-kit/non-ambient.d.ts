
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/create" | "/login" | "/my-puzzles" | "/puzzles" | "/puzzles/[id]";
		RouteParams(): {
			"/puzzles/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/create": Record<string, never>;
			"/login": Record<string, never>;
			"/my-puzzles": Record<string, never>;
			"/puzzles": { id?: string };
			"/puzzles/[id]": { id: string }
		};
		Pathname(): "/" | "/create" | "/login" | "/my-puzzles" | "/puzzles" | `/puzzles/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg";
	}
}
import { Fabric, CommunityDesign, DesignLayer } from "./types";

export const DEFAULT_FABRICS: Fabric[] = [
  {
    id: "emerald-silk",
    name: "Emerald Silk",
    type: "Silk",
    colors: ["#022c22", "#0f766e", "#115e59"],
    description: "Highly lustrous, fluid mulberry silk. Breathtaking drape with a subtle glowing emerald green surface reflection.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzq2IefwIRI7w0Fq6MpseDnHsOvVtpepA5DDZ0NBNfZ6yl_MRwnZeleAq0LiXbBmbUJh0GS8ZdrzIxW2JUyIV1HkDbIYmRUpeoZsMXw2PELEAYLvJsJocuTc4dM3X-WjLcRB8RVl3yEevOSLRsqdDXABHtDbvedRc9ivP6fy_LeeRckGYFu468WM7VKEpxe7LEVsZTMovx1ErqSQLiIf0SwV8BNwwhDTzsNR8qK8-t7nXXYg-0zn-QOGemrTcU06W_dSdzmo5b2EQ",
    tags: ["Mulberry", "Fluid", "Sheen", "Premium"],
    designer: "House of Chen",
    drapeFactor: "High",
    weight: "Lightweight"
  },
  {
    id: "raw-selvedge",
    name: "Raw Selvedge",
    type: "Denim",
    colors: ["#172554", "#1e1b4b", "#312e81"],
    description: "Coarse, unwashed 14oz shuttle-loomed indigo denim. Features red-line edge details and high structural rigidity.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9BWsicpn5rS39YCtIjOIMluKPrGh6Zrj6HadiPdH6vuM4moFeI5Ajm-FTv5fwgIcE4GonQBITZjJxdkz5btsuLMMMubhwwrMriEzL57Jhy2boEzmWxAUszQiU9DStH-uSE3sjxRPiiIC25oCcxO5Pullch1nU3KsThkPMLmw6kF5kqUgO3m9ZjqdP4oZaxb8p1tlE_fgxKLdc4npxNiPbVFB6CETeOaMq-zFe4Doc7yjPyshdjmzAk6l26ddBCpsDi0gE2fkOCjE",
    tags: ["Rigid", "Indigo", "Tactile", "Utility"],
    designer: "Kuroki Mills",
    drapeFactor: "Low",
    weight: "Heavy"
  },
  {
    id: "ruby-velvet",
    name: "Ruby Velvet",
    type: "Velvet",
    colors: ["#7f1d1d", "#4c0519", "#881337"],
    description: "Deep luxurious silk-pile velvet. Extreme light absorption creating rich shadows, woven with crimson and garnet undertones.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJCu2g_AFg51QNybaNvy07J7pTCSD1cGuAYdhP6VICCG_bxyEsn3uY-7b__4QhZdtsi5DVEjcqiSFHT5H7E1FA74RiW0XLC19Y92Yftp5HU74VK1lQKU4jSHMjM0wI3wiCpzXZ6ms4BQOZScTify4VecmGRSYmNn2THuhZRuoTqd6ZrX2HxK1CfkzNUq5evkPN04IvDDvlmkYkjHMcVmgzdm11u-YR7l3MJ_9227wOSEXSaygqu9E4hgZ4NlcS6j3yWgDiZvtYv7Q",
    tags: ["Plush", "Shadow", "Royal", "Rich"],
    designer: "Lyon Weavers",
    drapeFactor: "Medium",
    weight: "Heavy"
  },
  {
    id: "organic-linen",
    name: "Organic Linen",
    type: "Linen",
    colors: ["#f5f5f4", "#e7e5e4", "#d6d3d1"],
    description: "Slightly irregular slub texture from European organic flax. Highly breathable and lightweight with an elegant casual wrinkle.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxN1OXXSf6uX1p-NPV7QtWZOWe2Ji76qnPkwtONHVQj2ZY5hSAGKT1po4jX6QshNoggL-dYjSPTD50oZwS09Iehzv0TsSLU-0IJqeoOUA8EYtqzIbvuPACP5pqLALzvpKsoPExmoV7uHXYnG0yvJPfN663e_-b8HZjozGMrOdERE36bKt6EoHogowc46oRUiLxGFqZE5eJP8gux9XeAgUxN9skZUoJ6VPPETYDFn9Jb_cb_Dfl0OLE0x35qFzNeKAFzU_EKHvqnrs",
    tags: ["Breathable", "Flax", "Organic", "Neutral"],
    designer: "Flanders Flax",
    drapeFactor: "Medium",
    weight: "Lightweight"
  },
  {
    id: "onyx-hide",
    name: "Onyx Hide",
    type: "Leather",
    colors: ["#09090b", "#18181b", "#27272a"],
    description: "Vegetable-tanned full-grain cowhide leather with a supple semi-matte black finish. Designed for structural tailoring.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIjvkxF-0bPBGfGSFzcfxqYwPex7lwYzTrMz60lM6SvTJe1B3zxJ4ImFXQOK9OC9TciuXLNCtYEBcyCS42RFTJ359vaWNnCBI3LKMkNW6AfELeiCzPa_hs_LiNo9jkpUA0Ho6_CggGa1ICfrngOSSaAJOF6FTOCHGayT2VoIq31Uq0_jrl88M4zLQTBg-175qfaZ0erxNQf36H6V4rz4IJVi4-uXIq9vIKvD3gdE189Jru16TjbVV6cYvL97WNYHJA99kb7nQOM5E",
    tags: ["Matte", "Supple", "Tailoring", "Durable"],
    designer: "Tuscany Tanners",
    drapeFactor: "Structural",
    weight: "Heavy"
  },
  {
    id: "chantilly-lace",
    name: "Chantilly Lace",
    type: "Lace",
    colors: ["#fafaf9", "#f5f5f4", "#e7e5e4"],
    description: "Intricate floral lace handmade with fine linen thread. Striking details and negative spaces that create high-end visual layering.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCARVQIeI85_75Zvy3EVgAU1BKK0kMd4kS1e8e_mc4qih6bBl2boTUrANttONCx2ugVdJgZ6KTakkcytfQd9_MuqFQod4DI-obD9FjEXvrRsZZQQO-VAmDFAZpDyq9pcHTuBLiP2PW9nbGnjJFk7m7UjUSR7kCZJ0o_0K-HPNFcEhlYkOkJl-Tq8_x0NbZN3Qwma-8ayJWLUcbFVxYoBStgevZ-QNKjo8QuI64X6knbYPGjBX1hntfDJb8aeDvthCT9435tjYdMzg8",
    tags: ["Lace", "Flora", "Delicate", "Layering"],
    designer: "Atelier Calais",
    drapeFactor: "High",
    weight: "Lightweight"
  },
  {
    id: "grey-tweed",
    name: "Grey Tweed",
    type: "Tweed",
    colors: ["#4b5563", "#374151", "#1f2937"],
    description: "Classic flecked Harris wool tweed in slate and silver tones. Excellent warmth retention with an heritage vintage structure.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYFV_EyzmjEZak80uFLtR8j7kVRm-A9vqXFv9mXvDR2-VnQbIk6HwvLwPasFs6Jj604sNKRb-oxq-a4zOOHMkQvAye5lmYU3KZq-SlhImT7vJkU-NiA59D36Xumv0TKvh7w6giaZ5qt50eM9UaffFYIcT6G8fM5R99rc2U0bnuAaF-HDmrCfZsfsROi7jFNDnLC8qTR6xkmcDER_h4oNpvcEMvOzgMN5XcMmuYxxSi4FnFaSKzf0_yYcAaXPy4h3M2rpDck61hCro",
    tags: ["Heritage", "Wool", "Vintage", "Warm"],
    designer: "Harris Outer Hebrides",
    drapeFactor: "Structural",
    weight: "Heavy"
  },
  {
    id: "disco-scales",
    name: "Disco Scales",
    type: "Sequins",
    colors: ["#6366f1", "#4f46e5", "#c084fc"],
    description: "Overlapping mirror scales stitched onto high-stretch mesh. Reflects neon violet and deep space indigo as it catches motion.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-CHercEoV6z5kK6ObQJy2VLa7BakCPyEekFMdfQSLtD9DkNuUIq5xaJkJCulWZpKbtaMAalY807pZNfspwSLYhgFlM6V4s0-HAxokddXhlxCFMoabFbM9XsV7zkgz84FXurfx38y6snoBK5EXXYRLcx9RTmdHi9kle7cgKiGaMPK1Djcocg42MREWrY_MUStp_mYJtYhJEyJt6avLsPRsWKjH86zwUdygMlYOIACJa18RtExKA7eeUKrnI9GZQokG9erO0iHEiZE",
    tags: ["Reflective", "Sequin", "Electric", "Couture"],
    designer: "Tokyo Synth Materials",
    drapeFactor: "Medium",
    weight: "Medium"
  }
];

export const COMMUNITY_SHOWCASE: CommunityDesign[] = [
  {
    id: "neo-cocoon",
    title: "NEO-COCOON SHELL",
    designer: "Lyra Sterling",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmYyzmsn--cQ_KqSHPuCRXLIMgXAg2Qui_QoLPyzRFQRFzsbIDfE9ZzH7hHDA2GWi6hESdykwUFD_FyxhNgWDFukaIVGALlA1ni4W1FLHOUvLqrCmQG1r0tupeDyY9uDwbJOlc1emT0a-qHJxvAGfTcIlOl6uOSjwJGJaQzZ3zKhbc2DHakrdHpbnZpy89QTrK79_9NDFKmm02TPyjwfG2p_wjTR3dKxO7suhicfmq86Ga-hszU4SpSZF3XWgZz7nZub7nzPyI-IM",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATFylV9RpdGK5Y7GiLRhcKioxkzjDzuDAitpZXvrm1T-40aqopy80vms0Xk3GUGkRuLdazeSc1ZsBbopdPoCy5rw637_rPINWk1os1BsN2JHHIdOPi8KLq5Cgoeh0kFQwIi8FTb4S9a8NUsXwEY_kwKvuIhrOyyKC3mcdVZtSTDBYCiVr8bH5C2uq0yNU7KS4z6r2YvZBvhVn0m-sUodJuTnyNARgYPDo3CNFK_ESHCy_Q5N8ir0kHTE3SDloDlct7otRcwTaGTEc",
    likes: 1420,
    tags: ["Outerwear", "Technical", "Couture"],
    description: "An avant-garde silver cocoon shell that folds architectural pleats into an organic puffer silhouette. The outer layer reacts dynamically to ambient studio lighting, combining a liquid-silver structural drape with lightweight synthetic insulation.",
    fabricsUsed: ["Onyx Hide", "Disco Scales"],
    structure: "Oversized, cocooning, structural pleats"
  },
  {
    id: "glitch-weave",
    title: "GLITCH-WEAVE 0.1",
    designer: "Kaelen Vance",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB42XNlM9ndJ9ZESto4tuDeattjeZSdQ4om7F4gNRKzob_Ax966YcXdanmRqJJYZ2alU-JQ6AUUEF_kgrZyvV3agkSVpO5GKwd33MEfWaaE9d8z16nyxC5kHWhohwPtKxYZ2yyUW1XgpswkgoMYi8WcAYhH5cTx572JxFKoUKxo2fhZdnWK_j0rNxbvMyWk43VpW6bUrok96ZfHIyNS62cgP9qbTBRpMOzduks1lGzhYClEhc5hjkha1a4eLYl318QQe0a_0cy8I3Y",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzq2IefwIRI7w0Fq6MpseDnHsOvVtpepA5DDZ0NBNfZ6yl_MRwnZeleAq0LiXbBmbUJh0GS8ZdrzIxW2JUyIV1HkDbIYmRUpeoZsMXw2PELEAYLvJsJocuTc4dM3X-WjLcRB8RVl3yEevOSLRsqdDXABHtDbvedRc9ivP6fy_LeeRckGYFu468WM7VKEpxe7LEVsZTMovx1ErqSQLiIf0SwV8BNwwhDTzsNR8qK8-t7nXXYg-0zn-QOGemrTcU06W_dSdzmo5b2EQ",
    likes: 984,
    tags: ["Knitwear", "Streetwear", "Cyber"],
    description: "An intricate multi-colored woven mesh exploring computer glitch algorithms through high-density knitting. Deep magenta threads are spun with reflective neon fibers to form a tactile, heavy streetwear armor panel.",
    fabricsUsed: ["Disco Scales", "Grey Tweed"],
    structure: "Heavy knits, boxy structure, wide cuffs"
  },
  {
    id: "liquid-gown",
    title: "LIQUID GOWN CONCEPT",
    designer: "Clara Fontaine",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfBS6azUo_bMyN5sB1P5nGUJXk083aZljyMq27HU8aRo5XhyQe2B2YGfVbNqmvOzhybl0VBwG5IU7aDoi0VrMOLD28IL2hrEJPoyFnb2Y0JpplWHPjv22oNht2qmpwD6seJ4bv3OfRCUq2bCwiswP4xihQVBD6CkAtQsQwjQCBhTbuQTBvNWxVfWUmp6tx9q6UGjRPDoJmnvmIrXaMxlLaGGAL8_QQPiLT-QL31AyfXx04ZpRn_ELNguEs7tTj0gf7bnpPq9YmRog",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ1Gnkj0wweUlb_SwtaQlsT-JAWLFatl7ZfLWWSR-mBNT4RtV6rIMqVzDdBEJIwy2SI8v18EsWpqO38jE0KaVZuvH04ikojo4UqN6tZVy7eszSzfzdRLC4uIZ633GtGXgLk90AKVWEAcnOfw70CqIReFbBv4fKtsC9bdvktB1o7obtwhu3z1nUB8vkIKn45npJlrpXkI3bSPSG_WJpx6iljDZqF1Wf079pt903jL77WpggOmrUm3sSfTsWIR8O80L1c7fEpJmrYIo",
    likes: 1870,
    tags: ["Gown", "Drape", "Futuristic"],
    description: "A gorgeous, high-drape gown that captures a fluid, water-like state in real design. Uses lightweight metallic silk-mixes to cascading heights, creating a gorgeous sculptural shape on the model.",
    fabricsUsed: ["Emerald Silk", "Chantilly Lace"],
    structure: "Fitted bustier, asymmetrical layered drapes"
  },
  {
    id: "sketch-concept-a",
    title: "EVENING CONCEPT A (SKETCH)",
    designer: "Studio Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6Gz3q1lBHJG9JYQMNb2H_duNwG0Mg6YzURipFTxIxz_eUstiaDUww5Z7uOg-0X80fUJAvvboa9TYlAzNqAkzbacM-yLB_XLsuKL9peDH9flJreTMbQg0J18oXB-ov7RDiYPrhE99svjrCJJtsx0APnhMQsiKpY3ohQ-eBeCXt8CwD9FMCjn6yB9WW9MNV8LhE3vUybAJRxt_E5QEKfsK9rr_2olYiq-KkP9C2f4TfMdvvC697uaOgffkIINGJxInhd5OZMFSHWjg",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEyYe_h39zxTBkRDYKu-19oESf1xcwc6Oehv8t8JNCOeII1MdiVZlyvN5Ubo4p_qpYq8j68-oHOi2kH4ji7e2CJ5NEhadFR5Ym-Y-BMqhPl5Rvyk3lqnKsiDIltYPTlHF1-QtiGotEhS6xvTBCbZihZzW1mBkkcU5v7GMeFLdZ_bO23ZnQUV732Az_UStPJpU691NoFFNPj3LQtmDr3aTdzwXrnB8NNJz0xxiHtOI7ozmLHZIOnqA2iXhcN6ReboF_CJqMuDryjHE",
    likes: 640,
    tags: ["Sketch", "Concept", "Haute"],
    description: "A raw, charcoal pencil concept sketch detailing a modular tail jacket. Focuses on sharp shoulders, clean panel lines, and high collar structure overlaid with structured lace inserts.",
    fabricsUsed: ["Chantilly Lace", "Onyx Hide", "Ruby Velvet"],
    structure: "Aymmetrical blazer, high tailored neck"
  }
];

export const INITIAL_LAYERS: DesignLayer[] = [
  {
    id: "layer-1",
    name: "Base Structure (Silhouette)",
    type: "silhouette",
    opacity: 0.9,
    visible: true
  },
  {
    id: "layer-2",
    name: "Primary Panel (Emerald Silk)",
    type: "base_fabric",
    opacity: 0.8,
    visible: true,
    fabricId: "emerald-silk"
  },
  {
    id: "layer-3",
    name: "Collar & Accents (Ruby Velvet)",
    type: "accent",
    opacity: 0.7,
    visible: true,
    fabricId: "ruby-velvet"
  },
  {
    id: "layer-4",
    name: "Intricate Lace Trim (Chantilly)",
    type: "embellishment",
    opacity: 0.5,
    visible: false,
    fabricId: "chantilly-lace"
  }
];

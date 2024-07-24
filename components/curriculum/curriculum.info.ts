export type seccionCuerpoLateralInfoType = {
    titleIcon: {
        name: string;
        className: string;
    };
    title: string;
    info: {
        icon: {
            name: string;
            className: string;
        };
        main: string;
        aux: string;
        bar?: string
    }[];
}

export const seccionCuerpoLateralContactoInfo: seccionCuerpoLateralInfoType = {
    titleIcon: {
        name: "person",
        className: "material-symbols-outlined"
    },
    title: "Contact",
    info: [
        {
            icon: {
                name: "mail",
                className: "material-symbols-outlined"
            },
            main: "alvaro.ruiz.montaner@gmail.com",
            aux: ""
        },
        {
            icon: {
                name: "call",
                className: "material-symbols-outlined"
            },
            main: "675967289",
            aux: ""
        },
/*         {
            icon: {
                name: "group",
                className: "material-symbols-outlined"
            },
            main: "www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206",
            aux: ""
        }, */
        {
            icon: {
                name: "computer",
                className: "material-symbols-outlined"
            },
            main: "github.com/Varojausz",
            aux: ""
        },
        {
            icon: {
                name: "captive_portal",
                className: "material-symbols-outlined"
            },
            main: "webtheek.com",
            aux: ""
        }
    ],
}


export const seccionCuerpoLateralIdiomasInfo: seccionCuerpoLateralInfoType = {
    titleIcon: {
        name: "translate",
        className: "material-symbols-outlined"
    },
    title: "Languages",
    info: [
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Spanish",
            aux: "Native"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "English",
            aux: "Intermediate"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Portuguese",
            aux: "Professional"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Dutch",
            aux: "Amateur"
        }
    ],
}

export const seccionCuerpoLateralCodeInfo: seccionCuerpoLateralInfoType = {
    titleIcon: {
        name: "code",
        className: "material-symbols-outlined"
    },
    title: "Code Skills",
    info: [
        {
            icon: {
                name: "",
                className: ""
            },
            main: "CSS",
            aux: "",
            bar: "80%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "React",
            aux: "",
            bar: "70%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "MERN Stack",
            aux: "",
            bar: "60%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Python",
            aux: "",
            bar: "30%"
        }
    ],
}

export const seccionCuerpoLateralSkillsInfo: seccionCuerpoLateralInfoType = {
    titleIcon: {
        name: "rocket_launch",
        className: "material-symbols-outlined"
    },
    title: "Soft Skills",
    info: [
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Persistence",
            aux: "",
            bar: "100%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Curiosity",
            aux: "",
            bar: "80%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Optimism",
            aux: "",
            bar: "60%"
        },
        {
            icon: {
                name: "",
                className: ""
            },
            main: "Brainstorming",
            aux: "",
            bar: "60%"
        }
    ],
}
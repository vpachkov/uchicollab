export const Subjects = [
    { value: 'algebra', label: 'Алгебра' },
    { value: 'geometry', label: 'Геометрия' },
    { value: 'russian', label: 'Русский язык' },
    { value: 'english', label: 'Английский язык' },
    { value: 'biology', label: 'Биология' },
    { value: 'informatics', label: 'Информатика' },
    { value: 'socialstudies', label: 'Обществознание' },
    { value: 'physics', label: 'Физика' },
    { value: 'chemestry', label: 'Химия' },
    { value: 'naturalscience', label: 'Естествознание' },
    { value: 'economics', label: 'Экономика' },
    { value: 'jurisprudence', label: 'Правоведение' },
    { value: 'philosophy', label: 'Философия' },
    { value: 'ecology', label: 'Экология' },
    { value: 'astronomy', label: 'Астрономия' },
];

export const SubjectColor = {
    algebra: "rgb(189, 187, 240)",
    geometry: "rgb(171, 225, 250)",
    russian: "rgb(245, 190, 178)",
    english: "rgb(251, 240, 153)",
    biology: "rgb(206, 242, 201)",
    informatics: "rgb(243, 191, 159)",
    socialstudies: "rgb(250, 223, 202)",
    physics: "rgb(178, 186, 202)",
    naturalscience: "rgb(213, 219, 227)",
    economics: "rgb(245, 231, 208)",
    jurisprudence: "rgb(248, 213, 224)",
    philosophy: "rgb(232, 224, 208)",
    ecology: "rgb(170, 231, 187)",
    astronomy: "rgb(250, 228, 222)",
};

// Usage: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function ShadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}
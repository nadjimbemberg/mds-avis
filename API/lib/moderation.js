const MOTS_INTERDITS = [
    // Grossièretés françaises
    'putain', 'merde', 'connard', 'connasse', 'salope', 'enculé', 'encule',
    'pute', 'fdp', 'ntm', 'tg', 'bite', 'couille', 'couilles',
    'chier', 'foutre', 'nique', 'niquer', 'niquez', 'bâtard', 'batard',
    'con', 'conne', 'abruti', 'débile', 'imbécile', 'idiot', 'crétin',
    'branleur', 'merdique', 'salopard', 'ordure',
    'ta gueule', 'ferme ta gueule', 'fils de pute', 'va te faire foutre',
    // Anglais courant
    'fuck', 'fucking', 'shit', 'bitch', 'asshole', 'bastard', 'cunt',
];

const censurer = (texte) => {
    let resultat = texte;

    for (const mot of MOTS_INTERDITS) {
        const escaped = mot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = mot.includes(' ')
            ? new RegExp(escaped, 'gi')
            : new RegExp(`(?<![a-zA-ZÀ-ÿ])${escaped}(?![a-zA-ZÀ-ÿ])`, 'gi');

        resultat = resultat.replace(regex, (match) =>
            match[0] + '*'.repeat(match.length - 1)
        );
    }

    return resultat;
};

module.exports = { censurer };

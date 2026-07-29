module.exports = (req, res) => {
  res.json({
    message: "Bienvenue sur l'API Avis",
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /register':        'Créer un compte',
        'POST /login':           'Se connecter → retourne un JWT',
        'GET  /me':              'Voir son profil (authentifié)',
        'POST /change-password': 'Changer son mot de passe (authentifié)',
        'POST /forgot-password': 'Demander un lien de réinitialisation par email',
        'POST /reset-password':  'Réinitialiser son mot de passe avec le token reçu',
      },
      avis: {
        'GET    /avis':               'Lister les avis (pagination + filtres)',
        'GET    /avis/:id':           'Voir un avis par ID',
        'POST   /avis':               'Soumettre un avis (auth optionnelle)',
        'PUT    /avis/:id':           'Modifier son avis (authentifié)',
        'PUT    /authorize/avis/:id': 'Autoriser un avis (authentifié)',
        'DELETE /avis/:id':           'Supprimer son avis (authentifié)',
      },
    },
    filtres_GET_avis: {
      page:      'Numéro de page — défaut: 1',
      limit:     'Résultats par page — défaut: 10, max: 50',
      authorized:'true | false',
      rating:    '1 à 5',
      search:    'Recherche dans auteur et description',
      sortBy:    'date | rating | createdAt — défaut: createdAt',
      sortOrder: 'asc | desc — défaut: desc',
    },
  });
};

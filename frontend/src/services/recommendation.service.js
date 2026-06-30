const calculateScore = (product, selectedPreferences, selectedFeatures) => {
  const preferencesScore = product.preferences.filter((pref) =>
    selectedPreferences.includes(pref),
  ).length;

  const featuresScore = product.features.filter((feat) =>
    selectedFeatures.includes(feat),
  ).length;

  return preferencesScore + featuresScore;
};

const getRecommendations = (formData = {}, products = []) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = '',
  } = formData;

  if (!selectedPreferences.length && !selectedFeatures.length) {
    return [];
  }

  const scoredProducts = products
    .map((product, index) => ({
      ...product,
      score: calculateScore(product, selectedPreferences, selectedFeatures),
      originalIndex: index,
    }))
    .filter((product) => product.score > 0);

  scoredProducts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.originalIndex - a.originalIndex;
  });

  if (scoredProducts.length === 0) return [];

  const formattedProducts = scoredProducts.map(
    ({ score, originalIndex, ...product }) => product,
  );

  if (selectedRecommendationType === 'SingleProduct') {
    return [formattedProducts[0]];
  }

  return formattedProducts;
};

export default { getRecommendations };

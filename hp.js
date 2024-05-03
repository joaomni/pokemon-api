const initialLevel = 27;
const initialHP = 87;
const hpIncreasePerLevel = 3;

// Calcular o HP no level 12
const level12HP = initialHP + (12 - initialLevel) * hpIncreasePerLevel;

console.log(`HP no level 12: ${level12HP}`);

// Criar uma tabela ou lista de HP para os níveis de 1 a 100
const hpTable = Array.from({ length: 100 }, (_, index) => {
  const level = index + 1;
  const calculatedHP = initialHP + (level - initialLevel) * hpIncreasePerLevel;
  return { level, hp: calculatedHP };
});

// Imprimir a tabela ou lista
console.table(hpTable);
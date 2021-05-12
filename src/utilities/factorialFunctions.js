const factorial = (num) => {
  if (num === 0 || num === 1) {
    return 1;
  }
  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

const nChooseK = (n, k) => {
  return factorial(n) / (factorial(k) * factorial((n-k)))
}

const hypergeometricProbabilityCalculator = (populationSize, desirableElements, drawnFromPopulation, successesToCalculateFor) => {
  // hypergeometric distribution has p.m.f. KCk * (N-K)C(n-k) / NCn, where C is the "choose" operator representing binomial coefficients.
  // K = successes in population, N = population size, k = number of observed successes, n = numbers of draws.
  if (successesToCalculateFor > desirableElements) {
    return 0;
  }
  const topHalf = nChooseK(desirableElements, successesToCalculateFor) * nChooseK((populationSize - desirableElements), (drawnFromPopulation - successesToCalculateFor));
  const bottomHalf = nChooseK(populationSize, drawnFromPopulation);

  return topHalf / bottomHalf;
}

export const tripleProbabilityCalculator = (totalOptions, desiredOptions) => {
  return hypergeometricProbabilityCalculator(totalOptions, desiredOptions, 3, 1) + hypergeometricProbabilityCalculator(totalOptions, desiredOptions, 3, 2) + hypergeometricProbabilityCalculator(totalOptions, desiredOptions, 3, 3);
}
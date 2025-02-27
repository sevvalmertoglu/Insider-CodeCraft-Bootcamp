function collatzSequenceLength(n) {
    let length = 1;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        length++;
    }
    return length;
}

function findLongestCollatzSequence(limit) {
    let maxLength = 0;
    let startingNumber = 0;

    for (let i = 1; i < limit; i++) {
        let currentLength = collatzSequenceLength(i);
        if (currentLength > maxLength) {
            maxLength = currentLength;
            startingNumber = i;
        }
    }

    return { startingNumber, maxLength };
}

const limit = 1000000;
const result = findLongestCollatzSequence(limit);
console.log(`En uzun Collatz zinciri ${result.maxLength} adımla ${result.startingNumber} sayısından başlar.`);
export function removeQuotes(str) {
  str = str.replace(/^"(.*)"$/, "$1");
  return str;
}

export function onlyDigits(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    const d = s.charCodeAt(i);
    if (d < 48 || d > 57) return false;
  }
  return true;
}

export function isEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function calcJaroDist(s1, s2) {
  // If the strings are equal
  if (s1 == s2) return 100;

  // Length of two strings
  let len1 = s1.length,
    len2 = s2.length;

  // Maximum distance upto which matching
  // is allowed
  let max_dist = Math.floor(Math.max(len1, len2) / 2) - 1;

  // Count of matches
  let match = 0;

  // Hash for matches
  let hash_s1 = Array(s1.length).fill(0);
  let hash_s2 = Array(s1.length).fill(0);

  // Traverse through the first string
  for (let i = 0; i < len1; i++) {
    // Check if there is any matches
    for (
      let j = Math.max(0, i - max_dist);
      j < Math.min(len2, i + max_dist + 1);
      j++
    )
      // If there is a match
      if (s1[i] == s2[j] && hash_s2[j] == 0) {
        hash_s1[i] = 1;
        hash_s2[j] = 1;
        match++;
        break;
      }
  }

  // If there is no match
  if (match == 0) return 0.0;

  // Number of transpositions
  let t = 0;

  let point = 0;

  // Count number of occurrences
  // where two characters match but
  // there is a third matched character
  // in between the indices
  for (let i = 0; i < len1; i++)
    if (hash_s1[i]) {
      // Find the next matched character
      // in second string
      while (hash_s2[point] == 0) point++;

      if (s1[i] != s2[point++]) t++;
    }

  t /= 2;

  // Return the Jaro Similarity
  const index = (match / len1 + match / len2 + (match - t) / match) / 3.0;

  return (index * 100).toFixed(2);
}

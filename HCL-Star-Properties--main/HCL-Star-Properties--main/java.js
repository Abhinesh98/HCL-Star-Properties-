document.getElementById('showStarButton').addEventListener('click', () => {
    const stellariumUrl = 'https://stellarium-web.org/';
    window.open(stellariumUrl, '_blank');
});
document.getElementById('searchButton').addEventListener('click', () => {
    // Get coordinates of the star (RA and DEC) from user input
    const ra = document.getElementById('ra').value.trim();
    const dec = document.getElementById('dec').value.trim();
    const raRegex = /^\d{1,2}h\d{1,2}m\d{1,2}(?:\.\d+)?s$/;
    const decRegex = /^[-+]?\d{1,2}°\d{1,2}'\d{1,2}(?:\.\d+)?"$/;
    if (!raRegex.test(ra) || !decRegex.test(dec)) {
        alert("Invalid coordinates format. Please enter coordinates in the format '05h14m32.3s' for RA and '-08°12'05\"' for Dec.");
        return;
    }
    const simbadUrl = `http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=${encodeURIComponent(ra)}+${encodeURIComponent(dec)}&Radius=2&Radius.unit=arcmin&submit=submit+query`;
    window.open(simbadUrl, '_blank');
});

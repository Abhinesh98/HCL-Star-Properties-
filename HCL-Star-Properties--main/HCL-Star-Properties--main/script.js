function predictStarProperties(luminosity, spectralClass, temperature) {
    const stefanBoltzmannConstant = 5.67e-8;
    const sigmaT4 = stefanBoltzmannConstant * Math.pow(temperature, 4);
    const radius = Math.sqrt(luminosity / (4 * Math.PI * sigmaT4));

    let color;
    if (temperature > 15000) {
        color = "Blue";
    } else if (temperature >= 10000 && temperature <= 15000) {
        color = "White";
    } else {
        color = "Red";
    }

    const age = Math.random() * (1e9 - 1e6) + 1e6;
    const solarMassToKg = 1.989e30;
    const mass = (Math.random() * (10 - 0.1) + 0.1) * Math.sqrt(luminosity) * solarMassToKg;
    const position = [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000];

    return {
        Size: radius,
        Color: color,
        Age: age,
        Mass: mass
    };
}

function calculateDistanceAndLightYears(observedWavelength, emittedWavelength) {
    const redshift = (observedWavelength - emittedWavelength) / emittedWavelength;
    const hubbleConstant = 70e3;
    const distanceParsecs = redshift * 3e8 / hubbleConstant;

    if (distanceParsecs === 0) {
        return ["Invalid", redshift];
    }

    const distanceLightYears = distanceParsecs * 3.262; // Conversion factor for light years
    return [distanceLightYears, redshift];
}

function calculateParallaxAndParsec(baseline, angle1, angle2) {
    const angle1Rad = angle1 / 3600 * (Math.PI / 180);
    const angle2Rad = angle2 / 3600 * (Math.PI / 180);
    const parallaxAngleRad = Math.abs(angle1Rad - angle2Rad);

    const distanceParsecs = baseline / Math.tan(parallaxAngleRad / 2);
    return [parallaxAngleRad * (180 / Math.PI), distanceParsecs];
}

// Handle input/output using HTML and JavaScript DOM manipulation
function calculateStarProperties() {
    const luminosity = parseFloat(document.getElementById("luminosity").value);
    const spectralClass = document.getElementById("spectralClass").value;
    const temperature = parseFloat(document.getElementById("temperature").value);
    const baseline = parseFloat(document.getElementById("baseline").value);
    const angleObs1 = parseFloat(document.getElementById("angleObs1").value);
    const angleObs2 = parseFloat(document.getElementById("angleObs2").value);
    const observedWavelength = parseFloat(document.getElementById("observedWavelength").value);
    const emittedWavelength = parseFloat(document.getElementById("emittedWavelength").value);

    const starProperties = predictStarProperties(luminosity, spectralClass, temperature);
    const [parallaxAngleDeg, distanceParsecs] = calculateParallaxAndParsec(baseline, angleObs1, angleObs2);
    const [distanceLightYears, redshift] = calculateDistanceAndLightYears(observedWavelength, emittedWavelength);
    const shiftType = redshift > 0 ? "Redshift" : "Blueshift";

    // Display results
    let resultHtml = "<h2>Input Values:</h2>";
    resultHtml += `<p>Luminosity: ${luminosity}</p>`;
    resultHtml += `<p>Spectral Class: ${spectralClass}</p>`;
    resultHtml += `<p>Temperature: ${temperature}</p>`;
    resultHtml += `<p>Baseline: ${baseline}</p>`;
    resultHtml += `<p>Angle Obs1: ${angleObs1}</p>`;
    resultHtml += `<p>Angle Obs2: ${angleObs2}</p>`;
    resultHtml += `<p>Observed Wavelength: ${observedWavelength}</p>`;
    resultHtml += `<p>Emitted Wavelength: ${emittedWavelength}</p>`;

    resultHtml += "<h2>Calculated Star Properties:</h2>";
    resultHtml += `<p>Parallax Angle: ${parallaxAngleDeg.toFixed(6)} degrees</p>`;
    resultHtml += `<p>Distance in Parsecs: ${distanceParsecs.toFixed(6)} parsecs</p>`;
    resultHtml += distanceLightYears === "Invalid" ? "<p>Distance: Invalid</p>" :
        `<p>Distance in Light Years: ${distanceLightYears.toFixed(6)} light years</p>`;
    resultHtml += `<p>Redshift: ${redshift}</p>`;
    resultHtml += `<p>Shift Type: ${shiftType}</p>`;

    document.getElementById("result").innerHTML = resultHtml;
}

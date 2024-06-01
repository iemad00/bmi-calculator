document.addEventListener("DOMContentLoaded", () => {
    const metricUnit = document.getElementById("metric-unit");
    const imperialUnit = document.getElementById("imperial-unit");
    const metricInput = document.getElementById("metric-input");
    const imperialInput = document.getElementById("imperial-input");
    const metricUselector = document.getElementById("metric-uselector");
    const metricSelector = document.getElementById("metric-selector");
    const imperialUselector = document.getElementById("imperial-uselector");
    const imperialSelector = document.getElementById("imperial-selector");

    metricUnit.addEventListener("click", () => {
      metricInput?.classList.remove("d-none");
      imperialInput?.classList.add("d-none");
      metricUselector?.classList.remove("d-none");
      metricSelector?.classList.add("d-none");
      imperialUselector?.classList.add("d-none");
      imperialSelector?.classList.remove("d-none");
    });

    imperialUnit.addEventListener("click", () => {
      metricInput?.classList.add("d-none");
      imperialInput?.classList.remove("d-none");
      metricUselector?.classList.add("d-none");
      metricSelector?.classList.remove("d-none");
      imperialUselector?.classList.remove("d-none");
      imperialSelector?.classList.add("d-none");
    });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", calculateBMI);
    });
  });

  function calculateBMI() {

    let height, weight, bmi;

    const metricInput = document.getElementById("metric-input");

    if (metricInput.classList.contains("d-none")) {
      // Imperial
      const heightFt = parseFloat(
        document.getElementById("imperial-height-ft").value
      );
      const heightIn = parseFloat(
        document.getElementById("imperial-height-in").value
      );
      height = heightFt * 12 + heightIn;
      height *= 0.0254; // convert inches to meters

      const weightSt = parseFloat(
        document.getElementById("imperial-weight-st").value
      );
      const weightLbs = parseFloat(
        document.getElementById("imperial-weight-lbs").value
      );
      weight = weightSt * 14 + weightLbs;
      weight *= 0.453592; // convert lbs to kg
    } else {
      // Metric
      height =
        parseFloat(document.getElementById("metric-height").value) / 100; // convert cm to meters
      weight = parseFloat(document.getElementById("metric-weight").value);
    }

    if (!isNaN(height) && height > 0 && !isNaN(weight) && weight > 0) {
      document.getElementsByClassName("wc-header")[0]?.classList.add('d-none')
      document.getElementsByClassName("result-header")[0]?.classList.remove('d-none')

      bmi = weight / (height * height);
      bmi = bmi.toFixed(1);

      document.getElementById("bmi-value").innerText = bmi;
      let description = "";

      if (bmi < 18.5) {
        description = "underweight.";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        description = "a healthy weight.";
      } else if (bmi >= 25 && bmi <= 29.9) {
        description = "overweight.";
      } else {
        description = "obese.";
      }

      document.getElementById(
        "bmi-description"
      ).innerText = `Your BMI suggests you're ${description}`;

      // Calculate healthy weight range
      const healthyWeightMin = (18.5 * height * height).toFixed(1);
      const healthyWeightMax = (24.9 * height * height).toFixed(1);

      document.getElementById(
        "healthy-weight-range"
      ).innerText = `A healthy weight range for your height is between ${healthyWeightMin}kg and ${healthyWeightMax}kg.`;
    } else {
      document.getElementsByClassName("wc-header")[0]?.classList.remove('d-none')
      document.getElementsByClassName("result-header")[0]?.classList.add('d-none')
      document.getElementById("bmi-value").innerText = "";
      document.getElementById("bmi-description").innerText = "";
      document.getElementById("healthy-weight-range").innerText = "";
    }
  }
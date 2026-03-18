<script>
  function setMap(lat, lng) {
    const frame = document.getElementById("mapFrame");
    if (frame) {
      frame.src = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
    }
  }
</script>
</body>
</html>
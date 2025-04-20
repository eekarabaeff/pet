document.addEventListener('DOMContentLoaded', function() {
    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const url = window.location.href;
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const district = getParameterByName('district');
    
    document.getElementById('districtName').textContent = district;
    document.getElementById('districtMap').data = `/static/svgs/${district}.svg`;
});
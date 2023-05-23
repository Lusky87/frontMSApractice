const path = require("path");
const aliases = {
    "@": "src",
    "@js": "src/assets/js/",
    "@snippets": "src/components/snippets/",
    //'@api': 'src/api',
    //'@store': 'src/store', 확장 가능
};
module.exports = {
    webpack: {}
};
for (const alias in aliases) {
    //위 aliases 변수를 루프 돌면서 모두 적용
    const aliasTo = aliases[alias];
    module.exports.webpack[alias] = resolveSrc(aliasTo);
}

function resolveSrc(_path) {
    //path.resolve로 플랫폼 별 구분 기호를 구분 기호로 사용하여 지정된 모든 경로를 결합한 다음 결과 경로를 정규화합니다.
    return path.resolve(__dirname, _path);
}
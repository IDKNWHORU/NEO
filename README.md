# NEO
이 프로젝트는 Neo의 NEP17 스마트 컨트랙트를 작성하여 배포하고, UI에서 사용하는 과정을 설명합니다.

## neo-boa
Python으로 Neo3 스마트 컨트랙트를 작성할 수 있습니다.
### **[neo-boa 수행 페이지 바로가기](neo-boa/)**
## neo-mamba
Python으로 NEO 블록체인과 상호 작용할 수 있습니다.
- 스마트 컨트랙트 배포
- NEP-11 및 NEP-17 토큰 전송
- 가장 좋아하는 합의 노드에 투표
- 온체인 스마트 컨트랙트와 상호작용
- 지갑 관리
- 특수 트랜잭션 구축 및 서명
### **[neo-mamba 수행 페이지 바로가기](neo-mamba/)**
## neoline
NeoLine 지갑 크롬 확장 프로그램을 이용하여, NEO 블록체인과 쉽게 상호 작용할 수 있는 dapi를 이용한 개발한 FrontEnd를 만들 수 있습니다.
### **[neoline 수행 페이지 바로가기](neoline/)**
## 개발 사이클
1. neo-boa로 스마트 컨트랙트 개발
2. 스마트 컨트랙트 파일을 `.nef, manifest.json` 파일로 컴파일
3. neo-mamba로 스마트 컨트랙트 배포
4. neoline dapi를 이용해서 FrontEnd 개발
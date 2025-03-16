# 🚑 Projeto_Ambula  

O **Projeto_Ambula** é um sistema inovador para gestão e solicitação de ambulâncias sob demanda. Ele permite que usuários informem sua **origem** e **destino**, e o sistema calcula automaticamente a **rota**, **distância**, **tempo estimado de chegada** e **custo do percurso**.  

O objetivo é fornecer uma solução **ágil e eficiente** para deslocamentos médicos urgentes, otimizando a resposta das equipes de resgate e melhorando o atendimento de emergências.  

## 📷 Demonstração  
![Demonstração do projeto](https://github.com/user-attachments/assets/c53fcb25-7c7f-4ae9-bdf2-b4522bc85a3b)  

## 📌 Funcionalidades  
✅ O passageiro insere sua **origem** e **destino**.  
✅ O sistema **traça a rota** e exibe o percurso no mapa.  
✅ O usuário recebe informações sobre:  
   - 📍 **Distância total** a ser percorrida.  
   - 💰 **Preço estimado** da corrida.  
   - ⏳ **Tempo estimado de chegada**.  

## 🎯 Tecnologias Utilizadas  
- 🖥️ **Frontend:** Next.js  
- 📡 **APIs:** Google Maps (Geocoding, Directions e Autocomplete)

## 🔧 Pontos a Melhorar  

🚀 **Melhorias futuras e otimizações planejadas:**  

- 📱 **Responsividade para dispositivos móveis**: Adaptar o layout para melhor usabilidade em smartphones e tablets.  
- ⏳ **Tela de carregamento mais dinâmica**: Melhorar o feedback visual ao buscar rotas, tornando a experiência mais fluida.  
- 🔄 **Atualização dinâmica da rota**: Permitir que o usuário altere a **origem** e o **destino** sem precisar recarregar a página.  
- 🎨 **Layout mais dinâmico e interativo**: Melhorar a interface com animações e um design mais intuitivo.  


## 📂 Como Rodar o Projeto  

```bash
# Clone este repositório
git clone https://github.com/kelvis1/projeto-ambula.git

# Acesse a pasta do projeto
cd projeto-ambula

# Instale as dependências
npm install

# Execute o projeto
npm run dev

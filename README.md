# Recipes App 👨🏽‍🍳

## 📄 Sobre:

Projeto desenvolvido em <strong>grupo</strong> durante o módulo de front-end do curso de desenvolvimento web da [Trybe](https://www.betrybe.com/).

Neste projeto foi desenvolvido uma aplicação com receitas de comidas e bebidas.

Através da aplicação os usuários poderão:
> * Logar no aplicativo
> * Selecionar receitas de comidas ou de bebidas
> * Filtrar as receitas por nome, ingrediente ou tipo
> * Favoritar ou compartilhar as receitas
> * Acessar a tela de preparo
> * Visualizar as receitas finalizadas
> * Visualizar as receitas favoritadas
> * Realizar o logout da aplicação

Os dados das receitas utilizadas no projeto foram obtidos através das API's [TheMealDB](https://www.themealdb.com/) e [TheCocktailDB](https://www.thecocktaildb.com/api.php)

Para o gerenciamento do estado global foi utilizado <strong>Context API</strong>.

Também foram realizados testes unitários utilizando <strong>React Testing Library</strong>.

Durante a elaboração do projeto foram utilizadas metodologias de desenvolvimento ágil.

</br>
<details>
<summary><strong>Desempenho</strong></summary>
Aprovado com 100% de desempenho em todos os requisitos

![image](https://user-images.githubusercontent.com/99846604/211174290-17d91f22-6bc1-4fbd-80e4-908f7d748edd.png)

</details>

<details>
<summary><strong>Requisitos</strong></summary>
</br>
<strong>Requisitos obrigatórios:</strong>
</br>
Testes unitários: </br>
1. Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90% </br>
</br>

Tela de login: </br>
2. Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login </br>
3. Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha  </br>
4. Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos  </br>
5. Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user e os tokens nas chaves mealsToken e cocktailsToken </br>
6. Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login
</br>

Header: </br>
7. Implemente o header de acordo com a necessidade de cada tela </br>
8. Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil </br>
9. Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la
</br>

Barra de buscas - Header: </br>
10. Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo </br>
11. Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter </br>
12. Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas </br>
13. Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL </br>
14. Mostre as receitas em cards, caso mais de uma receita seja encontrada </br>
15. Exiba um alert caso nenhuma receita seja encontrada
</br>

Menu inferior: </br>
16. Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas </br>
17. Exiba o menu inferior apenas nas telas indicadas pelo protótipo </br>
18. Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior
</br>

Tela principal de receitas: </br>
19. Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card </br>
20. Implemente os botões de categoria para serem utilizados como filtro </br>
21. Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria </br>
22. Implemente o filtro como um toggle, o qual se for selecionado novamente, o app deve retornar as receitas sem nenhum filtro </br>
23. Redirecione a pessoa usuária ao clicar no card para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL
</br>

Tela de detalhes de uma receita: </br>
24. Realize uma request para a API passando o id da receita que deve estar disponível nos parâmetros da URL </br>
25. Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube "embedado" e recomendações </br>
26. Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida </br>
27. Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um carousel </br>
28. Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo </br>
29. Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça </br>
30. Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe" </br>
31. Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso </br>
32. Implemente um botão de compartilhar e um de favoritar a receita </br>
33. Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer na tela em uma tag HTML </br>
34. Salve as receitas favoritas no localStorage na chave favoriteRecipes </br>
35. Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e "despreenchido" caso contrário </br>
36. Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para "despreenchido" e vice-versa
</br>

Tela de receita em progresso: </br>
37. Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções </br>
38. Desenvolva um checkbox para cada item da lista de ingredientes </br>
39. Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista </br>
40. Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita </br>
41. Desenvolva a lógica de favoritar e compartilhar. A lógica da tela de detalhes de uma receita se aplica aqui </br>
42. Implemente a solução de modo que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem _"checkados"_ (marcados) </br>
43. Redirecione a pessoa usuária após clicar no botão de finalizar receita ("Finish Recipe"), para a página de receitas feitas, cuja rota deve ser /done-recipes </br>
44. Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo
</br>

Tela de receitas feitas: </br>
45. Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar </br>
46. Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar </br>
47. Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard </br>
48. Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros </br>
49. Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita
</br>

Tela de receitas favoritas: </br>
50. Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo </br>
51. Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar" </br>
52. Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita,  nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar" </br>
53. Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard </br>
54. Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do localStorage e da tela </br>
55. Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros </br>
56. Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita
</br>

Tela de perfil: </br>
57. Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo </br>
58. Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível </br>
59. Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout" </br>
60. Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas </br>
61. Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas </br>
62. Redirecione a pessoa usuária que ao clicar no botão de "Logout", o localStorage deve ser limpo e a rota deve mudar para a tela de login
</br>
</details>

<details>
<summary><strong>Visualizar projeto</strong></summary>

### Tela de login:

![image](https://user-images.githubusercontent.com/99846604/211174628-000c2722-8963-43bf-a05b-099aead8caa9.png)

### Tela de buscas:

![image](https://user-images.githubusercontent.com/99846604/211174493-e01002f5-5938-4617-9291-e0230a755a76.png)

### Tela de receitas:

![image](https://user-images.githubusercontent.com/99846604/211174521-d792fa76-6021-420e-89fe-b256523e8c5b.png)

### Tela de preparo:

![image](https://user-images.githubusercontent.com/99846604/211174540-9312f828-a7f3-4e76-8e4c-e960791df510.png)

### Receitas prontas:

![image](https://user-images.githubusercontent.com/99846604/211174563-bd26d704-16ea-417c-aa5d-ff92a22bf85c.png)

### Receitas favoritas:

![image](https://user-images.githubusercontent.com/99846604/211174590-2ddbcffb-8593-4033-aa7f-ca26a984d431.png)

### Tela de profile:

![image](https://user-images.githubusercontent.com/99846604/211174601-a34598e5-c343-4484-bfb8-ade90ffa7cdd.png)

</details>
</br>

## ⚙️ Execução

Faça o clone deste repositório com o seguinte comando:

        git clone git@github.com:joaoespacheco/Trybe-Project-20-recipes-app.git

Para exercutar o projeto utilize o comando abaixo para instalar as dependências:

        npm install

Inicie a aplicação com o comando abaixo:

        npm start
        
Para exeutar os testes deve-se utilizar o seguinte comando:

        npm test

Caso queira executar um teste específico, rode o comando abaixo:

        npm test <nome-do-arquivo>

Para executar e verificar a cobertura de testes, rode o comando abaixo:

        npm run test-coverage

</br>

## 🤹🏽 Habilidades Desenvolvidas:
* Trabalhar em grupo e em pair programming utilizando metodologias de desenvolvimento ágil
  * SCRUM
  * KANBAN
* Desenvolver uma aplicação react
  * Utilizar a Context API do React para gerenciar estado
  * Utilizar o React Hook useState
  * Utilizar o React Hook useContext
  * Utilizar o React Hook useEffect
  * Criar Hooks customizados
* Consumir dados de uma API
* Utilizar <strong>React Router</strong>
* Realizar testes unitários utilizando <strong>React Testing Library</strong>
* Criar layout com foco em dispositivos móveis
</br>

## 🧰 Ferramentas:
* HTML
* CSS
  * CSS.modules
* JavaScript
* React
  * React Context API
  * React Router
  * React Testing Library
  * React Icons
* Trello
</br>

## 📝 Desenvolvido por:
* [João Emanuel Soares Pacheco](https://github.com/joaoespacheco)
* [Vinícius Barbosa](https://github.com/ViniciusBF)
* [Pedro Jorge Machado](https://github.com/PedroJoMa)
* [João Sousa](https://github.com/rsajoao)

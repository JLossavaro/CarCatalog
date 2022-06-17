# Projeto CarCatalog

Projeto Fullstack envolvendo rotas autenticadas com JWT envolvendo um contexto de catalogo de carros.

## Descrição:

### Angular:

- Sessão publica com listagem de carros simples
- Sessão administrativo com operações CRUD, listagem, paginação de elementos e formulários reativos.

### C# .NET 6:

- Autenticação com JWT.
- Swagger para documentação de rotas
- Integração com banco de dados relacional.
- Rotas CRUD.
- Migrações Code-First.
- Configuração seed inicial(includes iniciais banco de dados).
- Banco de dados relacional - **POSTGRESSQL**

## Iniciando o Projeto

Instruções para iniciar o projeto e observações necessárias a respeito do código.

### BackEnd - Servidor RestAPI .NET 6

- **Banco de Dados**

	**PostgreSQL** 

	**-** Para iniciar o projeto certifique-se de configurar a porta para o banco de dados junto ao servidor para o banco de dados, o seguinte Código se encontra 		por padrão no arquivo **appsettings.json.**

	```json
	"ConnectionStrings": {
	    "DBConectionString":
			"Host=localhost;Port=5432;Pooling=true;
			Database=CarCatalogDB;Userid=postgres;Password=12345;" 
	  }
	```

	*obs: O banco é gerado automaticamente, junto a alguns valores para visualização.

	Usuários Padrão:

	**Admin**: julio_admin;**Senha**: admin123

	**User:julio_user;Senha:user123

- **Configurações e inicilização**
    
    O backend está configurado na pasta **lauchsettings.json**, no seguinte endereço local:
    
    **https://localhost:7269**
    
    Para acessar o swagger:
    
    **https://localhost:7269/swagger.**
    
    Use o seguinte comando para iniciar a aplicação
    
    ```csharp
    dotnet run
    ```
    
    ### FrontEnd- Angular 13
    
    O frontend está configurado na pasta **launch.json**, no seguinte endereço local:
    
    **https://localhost:4200**
    
    Use o seguinte comando para atualizar as importações do projeto
    
    ```csharp
    npm i
    ```
    
    Em seguida para iniciar:
    
    ```csharp
    npm run start
    ```

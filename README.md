# 🍔 Aiqfome! - Desafio Técnico Front-end (Next.js + React)

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedor Front-end. 
Abaixo eu explico todas as escolher que eu tomei: pastas, bibliotecas, integração com nextjs etc...

## 🌐 Deploy

Acesse o deploy [aqui]([https://seu-link.vercel.app](https://desafio-magalu-one.vercel.app/)).

---

## 📦 Estrutura de Pastas
```
modules/
├── restaurant-catalog/
│ ├── components/
│ ├── domain/
│ ├── hooks/
│ ├── services/
│ └── types/
├── search-restaurants/
│ ├── components/
│ ├── domain/
│ ├── hooks/
│ └── service/
```
### Modules Folder
A estrutura do projeto é baseada em módulos, onde cada módulo representa uma parte do nosso frontend. Por exemplo, o módulo de busca por restaurantes está em search-restaurants. <br/>

A vantagem disso é que conseguimos entender facilmente onde cada coisa está dentro do projeto. Se precisarmos alterar algo no filtro de busca de restaurantes, basta ir diretamente ao módulo correspondente. Além disso, essa organização ajuda a separar melhor as regras de negócio da camada de visualização, permitindo que enxerguemos o projeto como camadas com responsabilidades distintas. <br/>

Obs.: Neste projeto, como ele não é muito grande, essa separação modular não seria estritamente necessária. No entanto, escolhi organizá-lo dessa forma para manter tudo mais claro e organizado. É uma abordagem bem simplificada, pensada para não complicar demais o desafio.
#### Domain
A pasta domain é onde guardamos a tipagem principal do módulo. O conceito vem do DDD (Domain-Driven Design), onde o software é desenhado por domínio — ou seja, as entidades representam partes "palpáveis" do negócio. <br/>

Em projetos maiores, as regras de negócio são geralmente isoladas e organizadas em torno dessas entidades atrvés de classes. No nosso caso, tratam-se apenas de tipos TypeScript que representam os dados da aplicação.
#### Repository Type
Dentro do domain, temos uma tipagem chamada repository, que descreve as operações que faremos com as entidades: como get, delete e atualizações. <br/>
É comum ver isso implementado com classes, mas aqui optei por usar interfaces do TypeScript para se adequar melhor ao projeto. Exemplo:
```
export interface RestaurantRepository {
  getAll(): Promise<RestaurantEntity[]>;
  getByName(name: string, restaurants: RestaurantEntity[]): RestaurantEntity[];
  getByOpenStatus(restaurants: RestaurantEntity[]): {
    openRestaurantes: RestaurantEntity[];
    closedRestaurantes: RestaurantEntity[];
  };
}
```
#### Services
Services são funções que contêm objetos com métodos responsáveis por chamadas HTTP ou aplicação de regras de negócio. A ideia é isolar os endpoints, tornando a manutenção mais simples no futuro. Exemplo: <br/>
```

  const service: RestaurantRepository = {
    async getAll(): Promise<RestaurantEntity[]> {
      const response = await fetchFn!(
        `https://api-magalu-desafio.vercel.app/api/restaurants`
      );
      return await response.json();
    },}

```
Repare que o service implementa o repository. A ideia é respeitar a camada de domínio, deixando claro o que o serviço pode ou não fazer. <br/>

Essas são as explicações mais importantes em relação às pastas. O restante segue o padrão de custom hooks que já conhecemos no ReactJS. Tudo foi pensado para ser simples e direto ao ponto, sem complicar desnecessariamente o desafio.
#### Pasta API
Algo que achei interessante fazer foi simular uma API como se fosse de um backend real, mas utilizando a api folder do Next.js.
A intenção é simular chamadas HTTP para poder aproveitar os benefícios do SSR e do sistema de cache do Next, como se estivéssemos lidando com uma API externa.

Além disso, criei um segundo projeto Next.js separado, hospedado na Vercel, que serve exclusivamente como um mock de backend.
Ele contém apenas a pasta api com os endpoints e arquivos JSON representando os dados. Esse projeto simula uma API pública e serve de base para os serviços no frontend consumirem os dados via HTTP.

🔗 Repositório da API mockada: github.com/Tthiagoo/api-magalu-desafio



---
## 🧠 Estrategias com NextJS
### Paginas hibridas
Ao longo do projeto, procurei aplicar "use client" apenas nos componentes que realmente exigem interatividade. <br/>
A ideia é evitar o anti-pattern de transformar tudo em client components, o que acabaria desperdiçando os benefícios de server components, SSR (Server-Side Rendering), e outras otimizações do Next.js.
### ISR 
Outra coisa que achei interessante implementar foi o uso de ISR (Incremental Static Regeneration) na página inicial (home).
O objetivo é gerar páginas estáticas sob demanda, à medida que os usuários acessam a aplicação — uma estratégia que faz muito sentido em cenários reais com milhares de acessos simultâneos.

Configurei um revalidate de 1 minuto, partindo da suposição de que o status dos restaurantes não muda com tanta frequência.
Neste caso, o foco não foi a utilização mais realistica possivel, mas sim demonstrar como o ISR funciona na prática e como ele pode ajudar no desempenho.

### Metadata
Usando os metadatas do next, eu consig ver uma previa melhor nos links em que você compartilhar, testei no site https://metatags.io/ e esse foi o resultado: <br/>
![image](https://github.com/user-attachments/assets/2900b109-6f8f-4cf3-8f85-894338f1d566) ![image](https://github.com/user-attachments/assets/41c62bc2-7307-46f1-89b6-615c14c0243d)




## ⚙️Funcionalidades Extras
Algumas funcionalidades adicionais foram implementadas:

🔍 Filtro de busca por restaurante
Permite ao usuário digitar e filtrar restaurantes pelo nome em tempo real;

📍 localização do usuario
Ao clicar no ícone de mapa no cabeçalho, o usuário consegue ver o seu endereço para entrega;

🧠 Metadata com Open Graph e SEO
Algumas paginas possui metadados configurados com Open Graph (og:title, og:image, etc.), o que melhora a aparência dos links compartilhados e otimiza o SEO da aplicação.

🔗 Botão de compartilhamento (copiar link)
Um botão "Compartilhar" permite copiar o link da página atual para a área de transferência com um clique, facilitando o envio para outras pessoas, ele esta no icone de share na pagina do restaurante


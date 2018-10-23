import React from 'react';
import styled from 'styled-components';

const ParalaxStyled = styled.div`
  height: 100%;
  font-size: 16px;
  font-weight: 400px;
  line-height: 1.8em;
  color: #666;
`;

const Image = styled.div`
  position: relative;
  opacity: 0.7;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /*
    fixed = paralax;
    scroll = normal;
  */
  background-attachment: fixed;

  @media (max-width: 568px) {
    background-attachment: scroll;
  }
`;

const Image1 = styled(Image)`
  background-image: url('/public/images/anime1.jpg');

  min-height: 100%;
`;

const Image2 = styled(Image)`
  background-image: url('/public/images/anime2.png');
  min-height: 400px;
`;

const Image3 = styled(Image)`
  background-image: url('/public/images/anime3.png');
  min-height: 400px;
`;

const ParagrapText = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  color: #000;
  font-size: 27px;
  letter-spacing: 8px;
  text-transform: uppercase;
`;

const Bordered = styled.span`
  background-color: #111;
  color: white;
  padding: 20px;
  display: inline-block;
`;

const TransparentBordered = styled(Bordered)`
  background-color: transparent;
`;

const Heading = styled.h2``;

const Section = styled.section`
  text-align: center;
  padding: 50px 80px;
`;

const HeadlingLight = styled(Heading)`
  color: #666;
`;

const HeadingDark = styled(Heading)`
  color: #ddd;
`;
const SectionLight = styled(Section)`
  background-color: lightgray;
  color: #666;
`;

const SectionDark = styled(Section)`
  background-color: #282e34;
  color: #ddd;
`;

const ParalaxPage = () => (
  <ParalaxStyled>
    <Image1>
      <ParagrapText>
        <TransparentBordered>Parallax Website</TransparentBordered>
      </ParagrapText>
    </Image1>
    <SectionLight>
      <HeadlingLight>Section one</HeadlingLight>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam earum consequatur vero
        voluptates modi consectetur officia rem ipsa repellendus tempore accusantium accusamus,
        inventore atque beatae assumenda officiis tempora delectus voluptatibus quod non corrupti
        sapiente recusandae? Reprehenderit recusandae, quisquam quas tempora obcaecati fuga,
        laudantium, quod in tempore commodi aliquam pariatur at reiciendis harum? Voluptates
        architecto aliquid animi, pariatur perferendis eaque nisi non eum harum, tempora minima qui
        quam autem. Rerum repudiandae eligendi, eaque cum unde, similique laboriosam vero soluta
        reiciendis a vitae qui culpa, iste ad molestias aperiam animi omnis eos beatae iure? Beatae,
        soluta laudantium! Dolore ab magni voluptates autem?
      </p>
    </SectionLight>
    <Image2>
      <ParagrapText>
        <Bordered>Image 2 text</Bordered>
      </ParagrapText>
    </Image2>
    <SectionDark>
      <HeadingDark>Section two</HeadingDark>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam earum consequatur vero
        voluptates modi consectetur officia rem ipsa repellendus tempore accusantium accusamus,
        inventore atque beatae assumenda officiis tempora delectus voluptatibus quod non corrupti
        sapiente recusandae? Reprehenderit recusandae, quisquam quas tempora obcaecati fuga,
        laudantium, quod in tempore commodi aliquam pariatur at reiciendis harum? Voluptates
        architecto aliquid animi, pariatur perferendis eaque nisi non eum harum, tempora minima qui
        quam autem. Rerum repudiandae eligendi, eaque cum unde, similique laboriosam vero soluta
        reiciendis a vitae qui culpa, iste ad molestias aperiam animi omnis eos beatae iure? Beatae,
        soluta laudantium! Dolore ab magni voluptates autem?
      </p>
    </SectionDark>
    <Image3>
      <ParagrapText>
        <Bordered>Image 3 text</Bordered>
      </ParagrapText>
    </Image3>
    <SectionLight>
      <HeadlingLight>Section three</HeadlingLight>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus amet, debitis,
        voluptatum vero blanditiis nam aliquid non mollitia, rerum quos quia adipisci. Culpa sint
        sequi nisi quis id iure eum, doloribus ipsam tempore quam, eius illo quae alias! Sunt
        laborum obcaecati pariatur fuga enim animi. Nesciunt eius mollitia laudantium est quo esse
        aspernatur consequuntur eos totam tempora optio perferendis excepturi vitae autem, ullam
        tenetur dolorum, qui consequatur voluptatibus quia, ea sunt? Similique, distinctio ut autem
        commodi cumque quisquam architecto quos vel expedita earum repellendus? Nihil consequuntur
        nostrum accusamus quibusdam minima? Ad praesentium quis nobis iusto cumque quo culpa
        assumenda illo.
      </p>
    </SectionLight>
    <Image1>
      <ParagrapText>
        <Bordered>Parallax Website</Bordered>
      </ParagrapText>
    </Image1>
  </ParalaxStyled>
);

export default ParalaxPage;

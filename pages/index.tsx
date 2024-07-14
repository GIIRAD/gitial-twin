import type { NextPage } from 'next';
import { defaultTheme, Layout, LayoutColumn, Text, Heading, Box, Stack, TextLink, Button } from '@kiwicom/orbit-components';
import Background from '../components/common/common-styled-components';
import { getPing } from '@/components/hooks/ping';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Agent from '../public/emoji-agent.svg';
import Bild from '../public/image.png';
import { useRouter } from 'next/router';
import { getAllAAS } from '@/components/hooks/getAllAAS';

const Home: NextPage = () => {
  const router = useRouter();
  const [aas, setAas] = useState<any[] | null>(null);
  const [pingResponse, setPingResponse] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPing = async () => {
      const response = await getPing();
      if (response) {
        setPingResponse(response);
      }
    };

    const fetchAAS = async () => {
      const response = await getAllAAS();
      if (response) {
        setAas(response.result);
      }
    };

    fetchAAS();
    fetchPing();
  }, []);

  console.log(pingResponse);
  console.log(aas);

  const encode = (str: string) => {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  return (
    <div>
      {pingResponse === null ? (
        <Background color={defaultTheme.orbit.paletteCloudLight}>
          <Layout type="MMB">
            <Box margin={{ top: 'XXXLarge' }}>
              <Stack justify="center">
                <Image src={Agent} alt="Barrier" />
              </Stack>
            </Box>
            <Box direction="column" margin={{ top: 'large' }}>
              <Stack justify="center" direction="column" align="center" spacing="XSmall">
                <Text type="primary" size="large" weight="bold">Keine Verbindung zum Basyx Server</Text>
                <Text type="primary" size="large" weight="bold">
                  Es scheint so als würde der Basyx Server nicht erreichbar sein.
                </Text>
                <Text>
                  Bitte überprüfen Sie die Verbindung und versuchen Sie es erneut.
                </Text>
                <Text>
                  Wenn Sie Basyx noch nicht installiert haben können Sie sich die Anleitung ansehen
                </Text>
                <Button
                  onClick={() => {
                    window.open('/guide.pdf', '_blank');
                  }}
                >
                  Anleitung öffnen
                </Button>
              </Stack>
            </Box>
          </Layout>
        </Background>
      ) : (
        <Background color={defaultTheme.orbit.paletteCloudLight}>
          <Layout type="MMB">
            <Box margin={{ top: 'XXXLarge' }}>
              <Stack direction="column" spacing="medium">
                <Heading type="title1">
                  Lernen Sie wie man mit Verwaltungsschalen richtig umgeht
                </Heading>
                <Stack spacing="none">
                  <Text type="secondary" size="large">
                    Hier lernen Sie wie man mit Verwaltungsschalen anlegt und richtig konfiguriert.
                  </Text>
                </Stack>
              </Stack>
              <Box margin={{ top: 'XLarge' }}>
                <Stack justify="center">
                  <Image src={Bild} alt="Barrier" width={500} />
                  <Box>
                    <Stack direction="column" spacing="medium">
                      <Text type="primary" size="large">
                        Szenario:
                      </Text>
                      <Text>
                        In einer smarten Fabrik soll eine Produktionsmaschine überwacht und verwaltet werden. Die Maschine ist mit Sensoren ausgestattet, die verschiedene Parameter wie Temperatur, Vibration und Betriebsstunden erfassen. Ziel ist es, diese Daten in einer Verwaltungsschale zu sammeln und zugänglich zu machen, um die Wartung zu optimieren und Ausfallzeiten zu minimieren.
                      </Text>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <Box margin={{ top: 'XLarge' }}>
                <Stack direction="column" spacing="small">
                  <Text>Als erstes muss ein Digitaler Zwilling für die Maschine Angelegt werden. Hier können Sie alle registrierten AAS einsehen. Falls keine passende Vorhanden ist legen Sie ein neuen an über den Button AAS anlegen. Mit einem klick auf das AAS bekommen Sie mehr informationen dazu.</Text>
                  <Box>
                    <Stack spacing="small">
                      {aas === null ? (
                        <div>Noch nichts da</div>
                      ) : (
                        <div>
                          {aas.length === 0 ? (
                            <div>Noch nichts da</div>
                          ) : (
                            <div>
                              {aas.map((aasItem) => (
                                <Stack key={aasItem.id} direction="column" spacing="small">
                                  <TextLink
                                    onClick={() => {
                                      router.push(`/aas/${encode(aasItem.id)}`);
                                    }}
                                  >
                                    {aasItem.idShort}
                                  </TextLink>
                                </Stack>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          router.push('/createAAS');
                        }}
                      >
                        AAS Anlegen
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Layout>
        </Background>
      )}
    </div>
  );
};

export default Home;

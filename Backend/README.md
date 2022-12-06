
#intoductie
    Voor deze opdracht heb ik een controller aangemaakt met alle gebruikelijke crud acties. A ls database gebruik ik postgress

    Voor deze applicatie is de symfony-cli en docker vereist.
    Om de applicatie te starten moeten de volgende opdrachten in de terminal worden uit gevoerd vanuit deze map.

    docker-compose up -d en symfony server:start 

#API endpoints

| Name            | Method    | Endpoint      |
|-----------------|-----------|---------------|
| app_company     | GET       | /company      |
| company_create  | POST      | /company      |
| company_show    | GET       | /company/{id} |
| company_update  | PUT/PATCH | /company/{id} |
| company_delete  | DELETE    | /company/{id} |

## Company model
| Name        | Type       | Required      |
|-------------|------------|---------------|
| name        | String     | yes           |
| phoneNumber | String(10) | yes           |
| description | TEXT       | Yes           |


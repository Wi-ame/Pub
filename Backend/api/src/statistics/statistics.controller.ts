import { Controller, Get, Param, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistiques } from './statistics.entity';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path'; // Ajout de 'path' pour gérer les chemins
import axios from 'axios';

const execPromise = promisify(exec);

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticService: StatisticsService) {}

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Statistiques> {
        return this.statisticService.findOne(id);
    }

    @Get()
    findAll(): Promise<Statistiques[]> {
        return this.statisticService.findAll();
    }

    @Post('predict-performance')
    async predictPerformance(@Body() data: { campaign_id: number }) {
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate_performance_report', data);

            // Vérifiez la réponse de l'API Flask
            if (response.status !== 200) {
                throw new InternalServerErrorException('Erreur lors de la génération du rapport de performance');
            }

            // Retournez les données reçues de l'API Flask
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de l'appel à l'API Flask: ${error.message}`);
            throw new InternalServerErrorException(`Échec de l'exécution de la prédiction : ${error.message}`);
        }
    }
    
    

    @Post('compare')
    async compare(@Body() data: { campaign_id: number }) {
        try {
            // Utilisation de 'path' pour les chemins corrects
            const pythonPath = path.resolve('C:/Users/lenovo/PycharmProjects/pythonProject/venv/Scripts/python.exe');
            const scriptPath = path.resolve('C:/Users/lenovo/PycharmProjects/pythonProject/app.py');
            const command = `${pythonPath} ${scriptPath} --compare '${JSON.stringify(data)}'`;

            console.log(`Executing comparison command: ${command}`); // Debugging

            const { stdout, stderr } = await execPromise(command);

            if (stderr) {
                console.error(`Comparison error: ${stderr}`); // Debugging
                throw new InternalServerErrorException(`Error in comparison report: ${stderr}`);
            }

            // Vérification que la sortie est bien du JSON
            let result;
            try {
                result = JSON.parse(stdout.trim());
            } catch (parseError) {
                console.error(`JSON parse error: ${parseError.message}`); // Debugging
                throw new InternalServerErrorException(`Failed to parse JSON: ${parseError.message}`);
            }

            return result;
        } catch (error) {
            console.error(`Comparison execution error: ${error.message}`); // Debugging
            throw new InternalServerErrorException(`Failed to execute comparison: ${error.message}`);
        }
    }
}

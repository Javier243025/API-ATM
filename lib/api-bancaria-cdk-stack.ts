import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Stack, StackProps} from 'aws-cdk-lib';
import { LambdaIntegration, LambdaRestApi, RestApi }  from 'aws-cdk-lib/aws-apigateway';
export class ApiBancariaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda para depositar dinero
    const lambdaDepositoDinero = new Function(this, 'LambdaDepositoDinero', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'deposito.handler',
      code: Code.fromAsset('lambda'),
  })

    // Lambada para retirar dinero
    const lambdaRetiroDinero = new Function(this, 'LambdaRetiroDinero', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'retiro.handler',
      code: Code.fromAsset('lambda'),
  })

    
    // Lambada para cambiar la clave de la trajeta de debito
    const lambdaCambiarClave = new Function(this, 'LambdaCambiarClave', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'cambiarClave.handler',
      code: Code.fromAsset('lambda'),
  })

    //API Gateway para exponer las funciones
    const api = new RestApi(this, 'ApiGateway', {
      restApiName: 'ApiGateway-ATM',
    })

    //Crear los recursos
    // /atm/depositar
    // /atm/ retirar
    // /atm/cambiarClave

    const resource = api.root.addResource('atm')
    resource.addResource('depositar').addMethod('POST', new LambdaIntegration(lambdaDepositoDinero))
    resource.addResource('retirar').addMethod('POST', new LambdaIntegration(lambdaRetiroDinero))
    resource.addResource('cambiarClave').addMethod('POST', new LambdaIntegration(lambdaCambiarClave))


  }
}

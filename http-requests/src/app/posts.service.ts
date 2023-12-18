import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>()

  constructor(
    private http: HttpClient
  ) { }

  createAndStorePosts(title: string, content: string){
    const postData: any = {message: 'your rates',
    data: {
      rates: {
        greenScreens: {
          targetBuyRate: '1.459',
          lowBuyRate: '1.366',
          highBuyRate: '1.565',
          startBuyRate: '1.3375',
          fuelRate: '0.43',
          confidenceLevel: '87',
          networkRates: {
            targetBuyRate: '1.459',
            lowBuyRate: '1.366',
            highBuyRate: '1.565',
            startBuyRate: '1.3375',
            fuelRate: '0.43',
            confidenceLevel: '87',
          },
        },
        dat: {
          mileage: 2025,
          reports: 15,
          companies: 8,
          standardDeviation: 0.28,
          perMile: {
            rateUsd: 1.02,
            highUsd: 1.14,
            lowUsd: 0.72,
          },
          averageFuelSurchargePerMileUsd: 0.47,
          perTrip: {
            rateUsd: 2065.5,
            highUsd: 2308.5,
            lowUsd: 1458.0,
          },
          averageFuelSurchargePerTripUsd: 0.47,
          escalation: {
            timeframe: '7_DAYS',
            origin: {
              name: '606xx',
              type: '3_DIGIT_ZIP',
            },
            destination: {
              name: 'Los Angeles Mkt',
              type: 'MARKET_AREA',
            },
          },
        },
        request: {
          origin: {
            city: 'Chicago',
            stateOrProvince: 'IL',
            postalCode: '60611',
          },
          destination: {
            city: 'Los Angeles',
            stateOrProvince: 'CA',
            postalCode: '90001',
          },
          equipment: 'VAN',
          includeMyRate: false,
          targetEscalation: {
            escalationType: 'BEST_FIT',
          },
          rateType: 'SPOT',
          rateTimePeriod: {
            rateTense: 'CURRENT',
          },
        },
      },
    },}
    this.http.post(
      'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response',
        responseType: 'json'
      }
    ).subscribe(
      (responseData) =>{
        console.log(responseData);
        this.fetchPosts()
      }, error => {
        this.error.next(error.error.error)
      }
    )
  }

  fetchPosts(){
    let searchParams = new HttpParams()
    searchParams = searchParams.append('name','madhu')
    searchParams = searchParams.append('age','21')
    return this.http
      .get<{[key: string]: Post}>(
        'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Headers': 'Hello', 'Name': 'Madhu'}),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(map((responseData) =>{
        const postsArray: Post[] =[];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key})
          }
        }
        return postsArray;
      }),
        catchError( errorRes =>{
          return throwError(errorRes);
        })
      );
  }

  deletePosts(){
    return this.http
      .delete(
        'https://angular-firebase-2-e9201-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          responseType: 'text'
        }
      ).pipe(
        tap(event => {
          console.log(event)
          if(event.type === HttpEventType.Sent){

          }
          if(event.type === HttpEventType.Response){
            console.log(event.body)
          }
        })
      );
  }
}

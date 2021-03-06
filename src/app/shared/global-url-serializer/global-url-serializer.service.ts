import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree, UrlSegment } from '@angular/router';
import { childRouterOutlets } from '../../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlSerializerService extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    childRouterOutlets.forEach(outlet => {
      url = url.replace("(" + outlet + ":", "")
    })
    url = url.replace("-", "/")
    url = url.replace(")", "")
    return super.parse(url.split("?")[0])
  }
  serialize(tree: UrlTree): string {
    let url = super.serialize(tree)
    childRouterOutlets.forEach(outlet => {
      url = url.replace("(" + outlet + ":", "")
    })
    url = url.replace("-", "/")
    url = url.replace(")", "")
    return url.split("?")[0]
  }
}

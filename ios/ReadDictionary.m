//
//  ReadDictionary.m
//  Ruzzle
//
//  Created by Michael Cohen on 6/19/16.
//  Copyright © 2016 Facebook. All rights reserved.
//
#import "ReadDictionary.h"

@implementation ReadDictionary

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addWords:(RCTResponseSenderBlock)callback)
{
  NSString *filename = @"dictionary.txt";
  NSString *path = [[NSBundle mainBundle] pathForResource:[filename stringByDeletingPathExtension] ofType:[filename pathExtension]];
  
  NSString *text = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
  NSArray *dict = [text componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]];
  callback(@[[NSNull null], dict]);
}

@end


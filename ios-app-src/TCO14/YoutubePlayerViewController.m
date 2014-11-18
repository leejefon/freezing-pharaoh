//
//  YoutubePlayerViewController.m
//  TCO14
//
//  Created by Shady A. Elyaski on 11/18/14.
//  Copyright (c) 2014 Shady Elyaski. All rights reserved.
//

#import "YoutubePlayerViewController.h"

@interface YoutubePlayerViewController ()

@end

@implementation YoutubePlayerViewController
- (IBAction)closeBtnPressed:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
